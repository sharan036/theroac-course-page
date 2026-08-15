import { useCallback, useEffect, useRef, useState } from "react";
import { PlatformHealthData } from "@/src/lib/api/types";

interface Options {
  intervalMs?: number;
  onError?: (err: Error) => void;
}

export function usePlatformHealth({ intervalMs = 15_000, onError }: Options = {}) {
  const [data, setData] = useState<PlatformHealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchHealth = useCallback(async () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/platform-health", {
        signal: abortRef.current.signal,
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: PlatformHealthData = await res.json();
      setData(json);
      setLastUpdated(new Date());
      setError(null);
    } catch (err: any) {
      if (err.name === "AbortError") return; // intentional cancel
      const msg = err.message ?? "Unknown error";
      setError(msg);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    fetchHealth();
    const id = setInterval(fetchHealth, intervalMs);
    return () => {
      clearInterval(id);
      abortRef.current?.abort();
    };
  }, [fetchHealth, intervalMs]);

  return { data, loading, error, lastUpdated, refetch: fetchHealth };
}