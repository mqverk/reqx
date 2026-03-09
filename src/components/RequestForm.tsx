'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { HeaderEditor } from './HeaderEditor';
import { BodyEditor } from './BodyEditor';
import type { RequestHeader, HttpMethod } from '@/types';

interface RequestFormProps {
  method: HttpMethod;
  headers: RequestHeader[];
  body: string;
  onHeadersChange: (headers: RequestHeader[]) => void;
  onBodyChange: (body: string) => void;
}

export function RequestForm({
  method,
  headers,
  body,
  onHeadersChange,
  onBodyChange,
}: RequestFormProps) {
  const showBody = ['POST', 'PUT', 'PATCH'].includes(method);

  return (
    <Card className="flex flex-col bg-zinc-900/40 border-white/[0.06] overflow-hidden">
      <Tabs defaultValue="headers" className="flex-1 flex flex-col">
        <div className="px-4 pt-3">
          <TabsList className="bg-zinc-800/50">
            <TabsTrigger value="headers">
              Headers
              {headers.length > 0 && (
                <span className="ml-1.5 text-[10px] bg-zinc-700/50 text-zinc-400 px-1.5 py-0.5 rounded-full">
                  {headers.length}
                </span>
              )}
            </TabsTrigger>
            {showBody && <TabsTrigger value="body">Body</TabsTrigger>}
          </TabsList>
        </div>

        <TabsContent value="headers" className="flex-1 overflow-auto p-4 mt-0">
          <HeaderEditor headers={headers} onChange={onHeadersChange} />
        </TabsContent>

        {showBody && (
          <TabsContent value="body" className="flex-1 overflow-auto p-4 mt-0">
            <BodyEditor value={body} onChange={onBodyChange} />
          </TabsContent>
        )}
      </Tabs>
    </Card>
  );
}
