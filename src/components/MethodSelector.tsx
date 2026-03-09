'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { HttpMethod } from '@/types';

interface MethodSelectorProps {
  value: HttpMethod;
  onChange: (method: HttpMethod) => void;
}

const methods: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

const methodColors: Record<HttpMethod, string> = {
  GET: 'text-emerald-400',
  POST: 'text-amber-400',
  PUT: 'text-blue-400',
  DELETE: 'text-red-400',
  PATCH: 'text-purple-400',
  HEAD: 'text-zinc-400',
  OPTIONS: 'text-zinc-400',
};

export function MethodSelector({ value, onChange }: MethodSelectorProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as HttpMethod)}>
      <SelectTrigger className="w-[120px] font-bold text-xs bg-zinc-950/50 border-white/[0.06] h-10">
        <SelectValue>
          <span className={methodColors[value]}>{value}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-zinc-900 border-white/[0.08]">
        {methods.map((method) => (
          <SelectItem key={method} value={method}>
            <span className={`font-bold ${methodColors[method]}`}>{method}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
