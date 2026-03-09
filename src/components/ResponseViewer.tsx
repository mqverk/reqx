'use client';

import { useState } from 'react';
import { Copy, Check, Inbox, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ApiResponse } from '@/types';

interface ResponseViewerProps {
  response: ApiResponse | null;
  loading?: boolean;
}

export function ResponseViewer({ response, loading }: ResponseViewerProps) {
  const [copied, setCopied] = useState(false);

  if (!response && !loading) {
    return (
      <Card className="flex flex-col items-center justify-center py-16 bg-zinc-900/40 border-white/[0.06] text-center">
        <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4">
          <Inbox className="h-6 w-6 text-zinc-600" />
        </div>
        <p className="text-sm text-zinc-500 mb-1">No response yet</p>
        <p className="text-xs text-zinc-600">Send a request to see the response here</p>
      </Card>
    );
  }

  if (loading && !response) {
    return (
      <Card className="flex flex-col items-center justify-center py-16 bg-zinc-900/40 border-white/[0.06] text-center">
        <Loader2 className="h-6 w-6 text-cyan-500 animate-spin mb-3" />
        <p className="text-sm text-zinc-400">Sending request...</p>
      </Card>
    );
  }

  if (!response) return null;

  const copyToClipboard = async () => {
    try {
      const text = typeof response.data === 'string' 
        ? response.data 
        : JSON.stringify(response.data, null, 2);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const getStatusColor = (status: number) => {
    if (status === 0) return 'bg-red-500/10 text-red-400 border-red-500/20';
    if (status >= 200 && status < 300) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (status >= 300 && status < 400) return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    if (status >= 400 && status < 500) return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    return 'bg-red-500/10 text-red-400 border-red-500/20';
  };

  return (
    <Card className="flex flex-col bg-zinc-900/40 border-white/[0.06] overflow-hidden">
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-zinc-900/30">
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${getStatusColor(response.status)}`}>
            {response.status || 'Error'} {response.statusText}
          </span>
          <span className="text-xs text-zinc-500 font-mono">
            {response.time}ms
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          disabled={!response.data}
          className="h-7 px-2 text-zinc-500 hover:text-zinc-300"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>

      {response.error && (
        <div className="px-4 py-2.5 bg-red-500/5 border-b border-red-500/10">
          <p className="text-xs text-red-400 font-medium">{response.error}</p>
        </div>
      )}

      <Tabs defaultValue="body" className="flex-1 flex flex-col min-h-0">
        <TabsList className="mx-4 mt-3 shrink-0 bg-zinc-800/50">
          <TabsTrigger value="body">Body</TabsTrigger>
          <TabsTrigger value="headers">Headers</TabsTrigger>
          <TabsTrigger value="raw">Raw</TabsTrigger>
        </TabsList>

        <TabsContent value="body" className="flex-1 overflow-y-auto overflow-x-hidden p-4 mt-0 min-h-0">
          {response.data ? (
            typeof response.data === 'object' ? (
              <pre className="font-mono text-xs leading-relaxed whitespace-pre text-zinc-300 bg-zinc-950/50 p-4 rounded-lg border border-white/[0.04] w-full">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            ) : (
              <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap text-zinc-300 bg-zinc-950/50 p-4 rounded-lg border border-white/[0.04] w-full">
                {String(response.data)}
              </pre>
            )
          ) : (
            <p className="text-zinc-600 text-sm">No response body</p>
          )}
        </TabsContent>

        <TabsContent value="headers" className="flex-1 overflow-y-auto overflow-x-hidden p-4 mt-0 min-h-0">
          {Object.keys(response.headers).length > 0 ? (
            <div className="space-y-1.5">
              {Object.entries(response.headers).map(([key, value]) => (
                <div key={key} className="flex gap-3 text-xs font-mono py-1.5 border-b border-white/[0.03] last:border-0">
                  <span className="text-cyan-400/70 shrink-0 min-w-[160px]">{key}</span>
                  <span className="text-zinc-400 break-all">{value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-600 text-sm">No headers</p>
          )}
        </TabsContent>

        <TabsContent value="raw" className="flex-1 overflow-y-auto overflow-x-hidden p-4 mt-0 min-h-0">
          <pre className="font-mono text-xs leading-relaxed whitespace-pre text-zinc-400 w-full">
            {typeof response.data === 'string'
              ? response.data
              : JSON.stringify(response.data, null, 2)}
          </pre>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
