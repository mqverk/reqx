import React from 'react'
import ApiInput from '../components/ApiInput'
import RequestConfig from '../components/RequestConfig'
import RunTestButton from '../components/RunTestButton'
import MetricsCards from '../components/MetricsCards'
import History from '../components/History'
import TopMetrics from '../components/TopMetrics'
import dynamic from 'next/dynamic'
import ResultsTable from '../components/ResultsTable'

const LatencyChart = dynamic(() => import('../components/LatencyChart'), { ssr: false })
const LatencyHistogram = dynamic(() => import('../components/LatencyHistogram'), { ssr: false })

export default function Page() {
  return (
    <div className="space-y-6">
      <TopMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h2 className="text-lg font-semibold mb-2">Endpoint</h2>
          <ApiInput />
          <div className="mt-4">
            <RequestConfig />
            <div className="mt-4 flex items-center justify-between">
              <RunTestButton />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-sm font-medium mb-3">Metrics</h3>
          <MetricsCards />
          <div className="mt-4">
            <h4 className="text-xs text-slate-400 mb-2">Recent Tests</h4>
            <History />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-sm font-medium mb-3">Latency Timeline</h3>
          <LatencyChart />
        </div>

        <div className="card">
          <h3 className="text-sm font-medium mb-3">Latency Distribution</h3>
          <LatencyHistogram />
        </div>
      </div>

      <div className="card">
        <h3 className="text-sm font-medium mb-3">Requests</h3>
        <ResultsTable />
      </div>
    </div>
  )
}
