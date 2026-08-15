"use client";
import { useEffect, useState } from "react";

interface Toast {
  id: number;
  amount: number;
  reason: string;
}

let _addToast: ((amount: number, reason: string) => void) | null = null;

export function triggerEarnToast(amount: number, reason: string) {
  _addToast?.(amount, reason);
}

const REASON_LABELS: Record<string, string> = {
  event_register:       "Event registered",
  event_stage_1:        "Stage 1 submitted",
  event_stage_2:        "Stage 2 submitted",
  event_winner:         "Event winner 🏆",
  hackathon_register:   "Hackathon registered",
  hackathon_stage_1:    "Stage 1 submitted",
  hackathon_stage_2:    "Stage 2 submitted",
  hackathon_winner:     "Hackathon winner 🏆",
  workshop_register:    "Workshop registered",
  workshop_complete:    "Workshop completed",
  ret_attempt:          "RET attempted",
  ret_qualify:          "RET qualified ✓",
  quiz_participate:     "Quiz participated",
  quiz_win:             "Quiz won 🥇",
  daily_login:          "Daily login",
  streak_7day:          "7-day streak bonus 🔥",
};

export default function EarnToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  let counter = 0;

  useEffect(() => {
    _addToast = (amount, reason) => {
      const id = ++counter;
      setToasts(prev => [...prev, { id, amount, reason }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
    };
    return () => { _addToast = null; };
  }, []);

  if (!toasts.length) return null;

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background:   "#1A1A16",
          border:       "1px solid #2A2A22",
          borderLeft:   "3px solid #F5C300",
          borderRadius: 12,
          padding:      "10px 16px",
          display:      "flex",
          alignItems:   "center",
          gap:          10,
          boxShadow:    "0 8px 32px rgba(0,0,0,0.5)",
          animation:    "slideInToast 0.22s ease",
          minWidth:     200,
        }}>
          <span style={{ fontSize: 18 }}>🪙</span>
          <div>
            <div style={{ color: "#F5C300", fontWeight: 700, fontSize: 14 }}>+{t.amount} coins</div>
            <div style={{ color: "#888", fontSize: 11, marginTop: 1 }}>{REASON_LABELS[t.reason] ?? t.reason}</div>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes slideInToast {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}