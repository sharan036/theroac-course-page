"use client";
import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import axiosInstance from "@/src/lib/axios";

interface Transaction {
  id: string;
  type: "EARN" | "SPEND" | "ADJUST";
  amount: number;
  reasonCode: string;
  createdAt: string;
  metadata?: any;
}

interface Epoch {
  quarter: string;
  year: number;
  cap: number;
  distributed: number;
  remaining: number;
}

interface CoinState {
  balance: number;
  loginStreak: number;
  lastLoginDate: string | null;
  transactions: Transaction[];
  epoch: Epoch | null;
  loading: boolean;
}

interface CoinContextValue extends CoinState {
  refresh: () => Promise<void>;
  optimisticEarn: (amount: number) => void;
  optimisticSpend: (amount: number) => void;
}

const CoinContext = createContext<CoinContextValue | null>(null);

export function CoinProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CoinState>({
    balance: 0,
    loginStreak: 0,
    lastLoginDate: null,
    transactions: [],
    epoch: null,
    loading: true,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refresh = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("/wallet");
      setState(prev => ({
        ...prev,
        balance:       data.balance       ?? 0,
        loginStreak:   data.loginStreak   ?? 0,
        lastLoginDate: data.lastLoginDate ?? null,
        transactions:  data.transactions  ?? [],
        epoch:         data.epoch         ?? null,
        loading: false,
      }));
    } catch {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // Optimistic updates for instant UI feedback
  const optimisticEarn  = useCallback((amount: number) =>
    setState(prev => ({ ...prev, balance: prev.balance + amount })), []);
  const optimisticSpend = useCallback((amount: number) =>
    setState(prev => ({ ...prev, balance: Math.max(0, prev.balance - amount) })), []);

  useEffect(() => {
    refresh();
    // Re-fetch every 30s to stay in sync
    intervalRef.current = setInterval(refresh, 30_000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [refresh]);

  return (
    <CoinContext.Provider value={{ ...state, refresh, optimisticEarn, optimisticSpend }}>
      {children}
    </CoinContext.Provider>
  );
}

export function useCoins() {
  const ctx = useContext(CoinContext);
  if (!ctx) throw new Error("useCoins must be used inside <CoinProvider>");
  return ctx;
}