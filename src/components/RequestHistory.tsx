'use client';

import { Clock, Trash2, X, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ApiRequest, HttpMethod } from '@/types';

interface RequestHistoryProps {
  history: ApiRequest[];
  onSelect: (request: ApiRequest) => void;
  onClear: () => void;
  onRemove: (id: string) => void;
}

const methodColors: Record<HttpMethod, string> = {
  GET: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  POST: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  PUT: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  DELETE: 'bg-red-500/10 text-red-400 border-red-500/20',
  PATCH: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  HEAD: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  OPTIONS: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
};

export function RequestHistory({ history, onSelect, onClear, onRemove }: RequestHistoryProps) {
  if (history.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center py-16 bg-zinc-900/40 border-white/[0.06] text-center h-full">
        <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center mb-3">
          <Clock className="h-5 w-5 text-zinc-600" />
        </div>
        <p className="text-xs text-zinc-500">No history yet</p>
        <p className="text-[11px] text-zinc-600 mt-0.5">Requests will appear here</p>
      </Card>
    );
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="flex flex-col h-full bg-zinc-900/40 border-white/[0.06] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-zinc-900/30 shrink-0">
        <div className="flex items-center gap-2">
          <History className="h-3.5 w-3.5 text-zinc-500" />
          <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">History</h3>
          <span className="text-[10px] bg-zinc-800/80 text-zinc-500 px-1.5 py-0.5 rounded-full">{history.length}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-6 px-2 text-[11px] text-zinc-600 hover:text-red-400"
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Clear
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        {history.map((request) => (
          <div
            key={request.id}
            className="px-3 py-2.5 hover:bg-white/[0.02] cursor-pointer group border-b border-white/[0.03] last:border-0 transition-colors"
            onClick={() => onSelect(request)}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border ${methodColors[request.method]}`}>
                    {request.method}
                  </span>
                  <span className="text-[10px] text-zinc-600">
                    {formatTime(request.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 truncate font-mono" title={request.url}>
                  {request.url.replace(/^https?:\/\//, '')}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-zinc-600 hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(request.id);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
