"use client";

import { useState, useEffect, useCallback } from "react";
import { sendApiRequest } from "@/lib/apiClient";
import type {
  HttpMethod,
  ApiResponse,
  ApiRequest,
  RequestHeader,
  ResponseMetric,
} from "@/types";

const HISTORY_KEY = "reqx-history";
const METRICS_KEY = "reqx-metrics";
const MAX_HISTORY = 10;
const MAX_METRICS = 50;

/**
 * Custom hook for managing API requests, responses, and history
 */
export function useApiRequest() {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ApiRequest[]>([]);
  const [metrics, setMetrics] = useState<ResponseMetric[]>([]);

  // Load history and metrics from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      }
    } catch (error) {
      console.error("Failed to load history:", error);
    }
    try {
      const stored = localStorage.getItem(METRICS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setMetrics(parsed);
      }
    } catch (error) {
      console.error("Failed to load metrics:", error);
    }
  }, []);

  // Save history to localStorage whenever it changes
  const saveHistory = useCallback((newHistory: ApiRequest[]) => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  }, []);

  // Save metrics to localStorage
  const saveMetrics = useCallback((newMetrics: ResponseMetric[]) => {
    try {
      localStorage.setItem(METRICS_KEY, JSON.stringify(newMetrics));
      setMetrics(newMetrics);
    } catch (error) {
      console.error("Failed to save metrics:", error);
    }
  }, []);

  /**
   * Send an API request
   */
  const sendRequest = useCallback(
    async (
      method: HttpMethod,
      url: string,
      headers: RequestHeader[],
      body: string
    ): Promise<ApiResponse> => {
      setLoading(true);
      setResponse(null);

      try {
        const result = await sendApiRequest(method, url, headers, body);
        setResponse(result);

        // Record metric
        const responseSize = result.data
          ? new Blob([typeof result.data === 'string' ? result.data : JSON.stringify(result.data)]).size
          : 0;
        const metric: ResponseMetric = {
          timestamp: Date.now(),
          status: result.status,
          time: result.time,
          size: responseSize,
          method,
        };
        setMetrics((prev) => {
          const updated = [metric, ...prev].slice(0, MAX_METRICS);
          saveMetrics(updated);
          return updated;
        });

        // Add to history if request was valid
        if (url.trim()) {
          const newRequest: ApiRequest = {
            id: Date.now().toString(),
            method,
            url,
            headers,
            body,
            timestamp: Date.now(),
          };

          setHistory((prev) => {
            const updated = [newRequest, ...prev].slice(0, MAX_HISTORY);
            saveHistory(updated);
            return updated;
          });
        }

        return result;
      } finally {
        setLoading(false);
      }
    },
    [saveHistory, saveMetrics]
  );

  /**
   * Clear request history
   */
  const clearHistory = useCallback(() => {
    localStorage.removeItem(HISTORY_KEY);
    localStorage.removeItem(METRICS_KEY);
    setHistory([]);
    setMetrics([]);
  }, []);

  /**
   * Remove a single item from history
   */
  const removeFromHistory = useCallback(
    (id: string) => {
      setHistory((prev) => {
        const updated = prev.filter((item) => item.id !== id);
        saveHistory(updated);
        return updated;
      });
    },
    [saveHistory]
  );

  return {
    sendRequest,
    response,
    loading,
    history,
    metrics,
    clearHistory,
    removeFromHistory,
  };
}
