'use client';

import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Activity, BarChart3, Gauge, TrendingUp } from 'lucide-react';
import type { ResponseMetric, ApiResponse } from '@/types';

interface ResponseChartsProps {
  metrics: ResponseMetric[];
  response: ApiResponse | null;
}

const STATUS_COLORS: Record<string, string> = {
  '2xx': '#34d399',
  '3xx': '#60a5fa',
  '4xx': '#fbbf24',
  '5xx': '#f87171',
  'Err': '#f87171',
};

export function ResponseCharts({ metrics, response }: ResponseChartsProps) {
  const timeData = useMemo(() => {
    return [...metrics]
      .reverse()
      .slice(-20)
      .map((m, i) => ({
        index: i + 1,
        time: m.time,
        method: m.method,
      }));
  }, [metrics]);

  const statusData = useMemo(() => {
    const counts: Record<string, number> = { '2xx': 0, '3xx': 0, '4xx': 0, '5xx': 0, 'Err': 0 };
    for (const m of metrics) {
      if (m.status === 0) counts['Err']++;
      else if (m.status < 300) counts['2xx']++;
      else if (m.status < 400) counts['3xx']++;
      else if (m.status < 500) counts['4xx']++;
      else counts['5xx']++;
    }
    return Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([name, count]) => ({ name, count }));
  }, [metrics]);

  const sizeData = useMemo(() => {
    return [...metrics]
      .reverse()
      .slice(-20)
      .map((m, i) => ({
        index: i + 1,
        size: m.size < 1024 ? m.size : +(m.size / 1024).toFixed(1),
        unit: m.size < 1024 ? 'B' : 'KB',
      }));
  }, [metrics]);

  const avgTime = useMemo(() => {
    if (metrics.length === 0) return 0;
    return Math.round(metrics.reduce((s, m) => s + m.time, 0) / metrics.length);
  }, [metrics]);

  const avgSize = useMemo(() => {
    if (metrics.length === 0) return '0 B';
    const avg = metrics.reduce((s, m) => s + m.size, 0) / metrics.length;
    return avg < 1024 ? `${Math.round(avg)} B` : `${(avg / 1024).toFixed(1)} KB`;
  }, [metrics]);

  if (metrics.length === 0 && !response) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4">
          <BarChart3 className="h-6 w-6 text-zinc-600" />
        </div>
        <p className="text-sm text-zinc-500 mb-1">No metrics yet</p>
        <p className="text-xs text-zinc-600">Send requests to see performance graphs</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          icon={<Activity className="h-3.5 w-3.5 text-cyan-400" />}
          label="Requests"
          value={String(metrics.length)}
        />
        <StatCard
          icon={<Gauge className="h-3.5 w-3.5 text-emerald-400" />}
          label="Avg Latency"
          value={`${avgTime}ms`}
        />
        <StatCard
          icon={<TrendingUp className="h-3.5 w-3.5 text-blue-400" />}
          label="Last Time"
          value={response ? `${response.time}ms` : '—'}
        />
        <StatCard
          icon={<BarChart3 className="h-3.5 w-3.5 text-amber-400" />}
          label="Avg Size"
          value={avgSize}
        />
      </div>

      {/* Latency Chart */}
      {timeData.length > 1 && (
        <ChartSection title="Response Latency" subtitle="ms per request">
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={timeData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="latencyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="index"
                tick={{ fill: '#71717a', fontSize: 10 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#71717a', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                unit="ms"
              />
              <Tooltip content={<LatencyTooltip />} />
              <Area
                type="monotone"
                dataKey="time"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#latencyGrad)"
                dot={{ r: 3, fill: '#06b6d4', strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#06b6d4', stroke: '#0e1117', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartSection>
      )}

      {/* Status Code Distribution */}
      {statusData.length > 0 && (
        <ChartSection title="Status Codes" subtitle="distribution">
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={statusData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#71717a', fontSize: 10 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#71717a', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<StatusTooltip />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={40}>
                {statusData.map((entry) => (
                  <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || '#71717a'} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartSection>
      )}

      {/* Response Size Chart */}
      {sizeData.length > 1 && (
        <ChartSection title="Response Size" subtitle="per request">
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={sizeData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="index"
                tick={{ fill: '#71717a', fontSize: 10 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#71717a', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<SizeTooltip />} />
              <Bar dataKey="size" radius={[3, 3, 0, 0]} maxBarSize={24} fill="#3b82f6" fillOpacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </ChartSection>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-zinc-950/50 border border-white/[0.04] px-3 py-2.5">
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-semibold text-zinc-200 font-mono">{value}</p>
    </div>
  );
}

function ChartSection({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-zinc-950/50 border border-white/[0.04] p-3">
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-xs font-medium text-zinc-300">{title}</span>
        <span className="text-[10px] text-zinc-600">{subtitle}</span>
      </div>
      {children}
    </div>
  );
}

// Custom Tooltips
function LatencyTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { method: string } }> }) {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="rounded-md bg-zinc-900 border border-white/10 px-3 py-2 shadow-xl text-xs">
      <span className="text-cyan-400 font-mono font-semibold">{payload[0].value}ms</span>
      <span className="text-zinc-500 ml-2">{payload[0].payload.method}</span>
    </div>
  );
}

function StatusTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { name: string } }> }) {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="rounded-md bg-zinc-900 border border-white/10 px-3 py-2 shadow-xl text-xs">
      <span className="font-semibold" style={{ color: STATUS_COLORS[payload[0].payload.name] }}>{payload[0].payload.name}</span>
      <span className="text-zinc-400 ml-2">{payload[0].value} requests</span>
    </div>
  );
}

function SizeTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { unit: string } }> }) {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="rounded-md bg-zinc-900 border border-white/10 px-3 py-2 shadow-xl text-xs">
      <span className="text-blue-400 font-mono font-semibold">{payload[0].value} {payload[0].payload.unit}</span>
    </div>
  );
}
