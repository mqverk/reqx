 'use client'
import React from 'react'
import { useBenchmarkStore } from '../stores/benchmarkStore'
import { FileText, Code, Hash, Shuffle } from 'lucide-react'

export default function RequestConfig() {
  const config = useBenchmarkStore((s) => s.config)
  const setConfig = useBenchmarkStore((s) => s.setConfig)

  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="flex gap-3 items-center">
        <select
          value={config.method}
          onChange={(e) => setConfig({ method: e.target.value })}
          className="rounded-md bg-transparent border border-white/6 p-2 transition-shadow duration-150 focus:ring-1 focus:ring-indigo-500/30"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <div className="flex-1">
          <label className="block text-xs text-slate-400 flex items-center gap-2"><FileText size={14} className="text-slate-400"/> <span>Headers (JSON)</span></label>
          <textarea
            value={config.headers}
            onChange={(e) => setConfig({ headers: e.target.value })}
            className="w-full rounded-md bg-transparent border border-white/6 p-2 mt-1 text-xs h-16 input-mono transition-shadow duration-150 focus:ring-1 focus:ring-indigo-500/30"
            placeholder='{"Authorization":"Bearer ..."}'
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-slate-400 flex items-center gap-2"><Code size={14} className="text-slate-400"/> <span>Body (optional)</span></label>
        <textarea
          value={config.body}
          onChange={(e) => setConfig({ body: e.target.value })}
          className="w-full rounded-md bg-transparent border border-white/6 p-2 mt-1 text-xs h-24 input-mono transition-shadow duration-150 focus:ring-1 focus:ring-indigo-500/30"
          placeholder='{"key":"value"}'
        />
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 flex items-center gap-2"><Hash size={14} className="text-slate-400"/> <span>Count</span></label>
          <input
            type="number"
            min={1}
            max={100}
            value={config.count}
            onChange={(e) => setConfig({ count: Number(e.target.value) })}
            className="w-20 rounded-md bg-transparent border border-white/6 p-2 input-mono transition-shadow duration-150 focus:ring-1 focus:ring-indigo-500/30"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 flex items-center gap-2"><Shuffle size={14} className="text-slate-400"/> <span>Mode</span></label>
          <select
            value={config.concurrent ? 'concurrent' : 'sequential'}
            onChange={(e) => setConfig({ concurrent: e.target.value === 'concurrent' })}
            className="rounded-md bg-transparent border border-white/6 p-2"
          >
            <option value="sequential">Sequential</option>
            <option value="concurrent">Concurrent</option>
          </select>
        </div>
      </div>
    </div>
  )
}
