export type RequestConfig = {
  url: string
  method?: string
  headers?: Record<string, string>
  body?: string | null
  count?: number
  concurrent?: boolean
}

export type BenchmarkResult = {
  index: number
  duration: number
  status: number
  ok: boolean
  timestamp: number
  error?: string | null
}

export async function runBenchmark(cfg: RequestConfig, onProgress: (r: BenchmarkResult) => void) {
  const count = cfg.count ?? 1
  const concurrent = !!cfg.concurrent

  const doRequest = async (i: number) => {
    const start = performance.now()
    try {
      const res = await fetch(cfg.url, {
        method: cfg.method ?? 'GET',
        headers: cfg.headers as any || undefined,
        body: cfg.body || undefined,
      })
      const end = performance.now()
      const duration = end - start
      const result: BenchmarkResult = {
        index: i,
        duration,
        status: res.status,
        ok: res.ok,
        timestamp: Date.now(),
      }
      onProgress(result)
      return result
    } catch (err: any) {
      const end = performance.now()
      const duration = end - start
      const result: BenchmarkResult = {
        index: i,
        duration,
        status: 0,
        ok: false,
        timestamp: Date.now(),
        error: String(err?.message || err)
      }
      onProgress(result)
      return result
    }
  }

  if (concurrent) {
    const promises: Promise<BenchmarkResult>[] = []
    for (let i = 0; i < count; i++) promises.push(doRequest(i))
    return Promise.all(promises)
  }

  const results: BenchmarkResult[] = []
  for (let i = 0; i < count; i++) {
    // sequential
    const r = await doRequest(i)
    results.push(r)
  }
  return results
}
