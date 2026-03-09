'use client';

import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { RequestHeader } from '@/types';

interface HeaderEditorProps {
  headers: RequestHeader[];
  onChange: (headers: RequestHeader[]) => void;
}

export function HeaderEditor({ headers, onChange }: HeaderEditorProps) {
  const addHeader = () => {
    onChange([...headers, { key: '', value: '', enabled: true }]);
  };

  const updateHeader = (index: number, field: keyof RequestHeader, value: string | boolean) => {
    const updated = [...headers];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeHeader = (index: number) => {
    onChange(headers.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {headers.length > 0 && (
        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1 px-0.5">
          <div className="w-4"></div>
          <div>Key</div>
          <div>Value</div>
          <div className="w-8"></div>
        </div>
      )}

      {headers.map((header, index) => (
        <div key={index} className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 items-center">
          <input
            type="checkbox"
            checked={header.enabled}
            onChange={(e) => updateHeader(index, 'enabled', e.target.checked)}
            className="w-4 h-4 rounded border-white/10 bg-zinc-800 accent-cyan-500"
          />
          <Input
            placeholder="Header name"
            value={header.key}
            onChange={(e) => updateHeader(index, 'key', e.target.value)}
            className="text-xs font-mono bg-zinc-950/50 border-white/[0.06] h-8"
          />
          <Input
            placeholder="Value"
            value={header.value}
            onChange={(e) => updateHeader(index, 'value', e.target.value)}
            className="text-xs font-mono bg-zinc-950/50 border-white/[0.06] h-8"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeHeader(index)}
            className="h-7 w-7 text-zinc-600 hover:text-red-400"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={addHeader}
        className="mt-2 border-dashed border-white/[0.08] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.15] h-8 text-xs"
      >
        <Plus className="h-3.5 w-3.5 mr-1.5" />
        Add Header
      </Button>
    </div>
  );
}
