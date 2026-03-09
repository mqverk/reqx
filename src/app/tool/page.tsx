"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Send,
  Zap,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Keyboard,
  Repeat,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MethodSelector } from "@/components/MethodSelector";
import { RequestForm } from "@/components/RequestForm";
import { ResponseViewer } from "@/components/ResponseViewer";
import { RequestHistory } from "@/components/RequestHistory";
import { useApiRequest } from "@/hooks/useApiRequest";
import type { HttpMethod, RequestHeader, ApiRequest } from "@/types";

import { ConnectionHelpDialog } from "@/components/ConnectionHelpDialog";

export default function ToolPage() {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState<RequestHeader[]>([]);
  const [body, setBody] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [requestCount, setRequestCount] = useState(1);
  const [requestCountInput, setRequestCountInput] = useState("1");

  const {
    sendRequest,
    response,
    loading,
    history,
    metrics,
    clearHistory,
    removeFromHistory,
  } = useApiRequest();

  const handleSend = useCallback(async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    const count = Math.max(1, Math.min(requestCount, 100));

    for (let i = 0; i < count; i++) {
      const result = await sendRequest(method, url, headers, body);

      if (result.error) {
        if (result.errorType === "RESTRICTED_ACCESS") {
          setShowHelpDialog(true);
          break;
        } else {
          toast.error(count > 1 ? `Request ${i + 1}/${count} failed: ${result.error}` : result.error);
        }
      } else if (i === count - 1 && result.status >= 200 && result.status < 300) {
        toast.success(count > 1 ? `All ${count} requests completed (${result.status})` : `Request successful (${result.status})`);
      }
    }
  }, [url, method, headers, body, sendRequest, requestCount]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("url-input")?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSend]);

  const loadFromHistory = (request: ApiRequest) => {
    setMethod(request.method);
    setUrl(request.url);
    setHeaders(request.headers);
    setBody(request.body);
    toast.success("Request loaded from history");
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Toaster position="top-right" theme="dark" />
      <ConnectionHelpDialog
        open={showHelpDialog}
        onOpenChange={setShowHelpDialog}
      />

      {/* Header */}
      <header className="border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/15">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight">
              <span className="text-zinc-50">req</span>
              <span className="text-cyan-400">x</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-600 mr-2">
              <Keyboard className="h-3 w-3" />
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/[0.06] text-zinc-500 font-mono">
                Ctrl+Enter
              </kbd>
              <span>send</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/[0.06] text-zinc-500 font-mono ml-1">
                Ctrl+K
              </kbd>
              <span>focus</span>
            </div>
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-500 hover:text-zinc-300 h-8 text-xs"
              >
                <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-5 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
          {/* Main Content */}
          <div className="space-y-4">
            {/* URL Bar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-2 bg-zinc-900/60 border-white/[0.06] shadow-xl shadow-black/20">
                <div className="flex gap-2 items-center">
                  <MethodSelector value={method} onChange={setMethod} />
                  <div className="flex-1 relative">
                    <Input
                      id="url-input"
                      type="url"
                      placeholder="Enter request URL..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="font-mono text-sm bg-zinc-950/50 border-white/[0.06] h-10 pr-16 focus-visible:border-cyan-500/50 focus-visible:ring-cyan-500/20"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSend();
                      }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 hidden sm:block pointer-events-none">
                      ↵ Send
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-zinc-950/50 border border-white/[0.06] rounded-md h-10 px-2 shrink-0">
                    <Repeat className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={requestCountInput}
                      onChange={(e) => setRequestCountInput(e.target.value)}
                      onBlur={() => {
                        const v = parseInt(requestCountInput, 10);
                        const clamped = isNaN(v) || v < 1 ? 1 : v > 100 ? 100 : v;
                        setRequestCount(clamped);
                        setRequestCountInput(String(clamped));
                      }}
                      className="w-8 bg-transparent text-center text-sm text-zinc-300 font-mono outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </div>
                  <Button
                    onClick={handleSend}
                    disabled={loading || !url.trim()}
                    className="h-10 px-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 shadow-lg shadow-cyan-500/15 disabled:opacity-40 disabled:shadow-none transition-all"
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Send className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Request / Response Split */}
            <div className="grid grid-cols-1 xl:grid-rows-[auto_1fr] gap-4">
              {/* Request Panel */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <RequestForm
                  method={method}
                  headers={headers}
                  body={body}
                  onHeadersChange={setHeaders}
                  onBodyChange={setBody}
                />
              </motion.div>

              {/* Response Panel */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <ResponseViewer response={response} loading={loading} metrics={metrics} />
              </motion.div>
            </div>
          </div>

          {/* Sidebar - History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:block hidden"
          >
            <div className="sticky top-[72px] h-[calc(100vh-92px)]">
              <RequestHistory
                history={history}
                onSelect={loadFromHistory}
                onClear={clearHistory}
                onRemove={removeFromHistory}
              />
            </div>
          </motion.div>
        </div>

        {/* Mobile History Toggle */}
        <div className="lg:hidden mt-5">
          <Button
            variant="outline"
            onClick={() => setShowHistory(!showHistory)}
            className="w-full border-white/[0.06] bg-zinc-900/40 hover:bg-zinc-800/40"
          >
            {showHistory ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Hide History
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show History ({history.length})
              </>
            )}
          </Button>

          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 max-h-[400px] overflow-hidden"
              >
                <RequestHistory
                  history={history}
                  onSelect={(req) => {
                    loadFromHistory(req);
                    setShowHistory(false);
                  }}
                  onClear={clearHistory}
                  onRemove={removeFromHistory}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
