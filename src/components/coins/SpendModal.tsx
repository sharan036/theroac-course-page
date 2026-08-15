"use client";
import { useState } from "react";
import { useCoins } from "@/src/context/CoinContext";
import axiosInstance from "@/src/lib/axios";

interface SpendModalProps {
  reasonCode: string;
  label: string;
  description?: string;
  amount: number;
  referenceId?: string;
  onSuccess?: (result: any) => void;
  onClose: () => void;
}

export default function SpendModal({
  reasonCode, label, description, amount, referenceId, onSuccess, onClose
}: SpendModalProps) {
  const { balance, optimisticSpend, refresh } = useCoins();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const postBalance = balance - amount;
  const canAfford   = balance >= amount;

  const handleConfirm = async () => {
    if (!canAfford) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosInstance.post("/spend", {
        reasonCode,
        referenceId: referenceId ?? null,
      });
      optimisticSpend(amount);
      await refresh();
      onSuccess?.(data);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.error ?? "Failed to spend coins. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9998,
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#1A1A16", border: "1px solid #2A2A22",
        borderRadius: 16, padding: 28, width: "100%", maxWidth: 380,
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
      }}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>Confirm spend</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{label}</div>
        {description && <div style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>{description}</div>}

        {/* Cost row */}
        <div style={{ background: "#111", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "#888", fontSize: 13 }}>Cost</span>
            <span style={{ color: "#F5C300", fontWeight: 700 }}>🪙 {amount} coins</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #222", paddingTop: 8 }}>
            <span style={{ color: "#888", fontSize: 13 }}>Balance after</span>
            <span style={{ color: canAfford ? "#fff" : "#F87171", fontWeight: 700 }}>
              🪙 {postBalance.toLocaleString()} coins
            </span>
          </div>
        </div>

        {!canAfford && (
          <div style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: "#F87171", fontSize: 13 }}>
            Insufficient balance. You need {amount - balance} more coins.
          </div>
        )}

        {error && (
          <div style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: "#F87171", fontSize: 13 }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} disabled={loading} style={{
            flex: 1, padding: "11px", borderRadius: 10, border: "1px solid #2A2A22",
            background: "transparent", color: "#888", fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>
            Cancel
          </button>
          <button onClick={handleConfirm} disabled={!canAfford || loading} style={{
            flex: 2, padding: "11px", borderRadius: 10, border: "none",
            background: canAfford ? "#F5C300" : "#333", color: canAfford ? "#000" : "#555",
            fontSize: 13, fontWeight: 700, cursor: canAfford ? "pointer" : "not-allowed",
          }}>
            {loading ? "Processing…" : `Confirm — 🪙 ${amount} coins`}
          </button>
        </div>
      </div>
    </div>
  );
}