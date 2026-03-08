import create from 'zustand'
import { runBenchmark, RequestConfig, BenchmarkResult } from '../lib/benchmark'

type Config = {
  url: string
  method: string
  headers?: string
  body?: string
  count: number
  concurrent: boolean
}

type HistoryItem = {
  id: string
  timestamp: number
  config: Config
  results: BenchmarkResult[]
}

type State = {
  config: Config
  results: BenchmarkResult[]
  running: boolean
  history: HistoryItem[]
  setConfig: (patch: Partial<Config>) => void
  clearResults: () => void
  startBenchmark: () => Promise<void>
  saveHistory: (item: HistoryItem) => void
  loadHistory: () => void
  loadHistoryItem: (id: string) => void
}

export const useBenchmarkStore = create<State>((set, get) => ({
  config: {
    url: 'https://api.github.com',
    method: 'GET',
    headers: '',
    body: '',
    count: 10,
    concurrent: false,
  },
  results: [],
  running: false,
  history: [],
  setConfig: (patch) => set((s) => ({ config: { ...s.config, ...patch } })),
  clearResults: () => set({ results: [] }),
  startBenchmark: async () => {
    const cfg = get().config
    set({ results: [], running: true })
    const headersObj: Record<string, string> = {}
    if (cfg.headers) {
      try {
        const h = JSON.parse(cfg.headers)
        Object.assign(headersObj, h)
      } catch (e) {
        // ignore parse error; assume raw header string
      }
    }

    await runBenchmark(
      {
        url: cfg.url,
        method: cfg.method,
        headers: Object.keys(headersObj).length ? headersObj : undefined,
        body: cfg.body || undefined,
        count: cfg.count,
        concurrent: cfg.concurrent,
      },
      (r) => {
        set((s) => ({ results: [...s.results, r] }))
      }
    )

    const results = get().results
    const historyItem: HistoryItem = {
      id: String(Date.now()),
      timestamp: Date.now(),
      config: cfg,
      results,
    }
    get().saveHistory(historyItem)
    set({ running: false })
  },
  saveHistory: (item) => {
    set((s) => {
      const next = [item, ...s.history].slice(0, 50)
      if (typeof window !== 'undefined') localStorage.setItem('reqx:history', JSON.stringify(next))
      return { history: next }
    })
  },
  loadHistory: () => {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem('reqx:history')
      if (!raw) return
      const parsed = JSON.parse(raw)
      set({ history: parsed })
    } catch (e) {
      // ignore
    }
  }
  ,
  loadHistoryItem: (id: string) => {
    set((s) => {
      const item = s.history.find((h) => h.id === id)
      if (!item) return {}
      return { config: item.config, results: item.results }
    })
  }
}))
