'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { isValidJson } from '@/lib/apiClient';

interface BodyEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function BodyEditor({ value, onChange }: BodyEditorProps) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (value.trim() && !isValidJson(value)) {
      setError('Invalid JSON syntax');
    } else {
      setError(null);
    }
  }, [value]);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(value);
      onChange(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch {
      setError('Cannot format invalid JSON');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">JSON Body</span>
        {value.trim() && !error && (
          <button
            onClick={formatJson}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Format JSON
          </button>
        )}
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='{"key": "value"}'
        className="font-mono text-xs min-h-[200px] bg-zinc-950/50 border-white/[0.06] focus-visible:border-cyan-500/50 focus-visible:ring-cyan-500/20"
      />
      {error && (
        <Alert variant="destructive" className="border-red-500/20 bg-red-500/5">
          <AlertCircle className="h-3.5 w-3.5" />
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
