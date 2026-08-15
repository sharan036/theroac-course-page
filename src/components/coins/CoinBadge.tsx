"use client";
import { useCoins } from "@/src/context/CoinContext";
import { useRouter } from "next/navigation";

interface CoinBadgeProps {
  isMobile?: boolean;
  walletPath?: string; // e.g. "/dashboard/candidate/wallet"
  theme?: "dark" | "light";
}

export default function CoinBadge({
  isMobile = false,
  walletPath = "/dashboard/candidate/wallet",
  theme = "dark",
}: CoinBadgeProps) {
  const { balance, loading } = useCoins();
  const router = useRouter();

  const isDark = theme === "dark";
  const bg     = isDark ? "#141411" : "#ffffff";
  const border = isDark ? "#2A2A22" : "#e8e8e0";
  const text   = isDark ? "#F5C300" : "#111111";

  return (
    <div
      onClick={() => router.push(walletPath)}
      title="ROAC Coins — click to view wallet"
      className="flex items-center gap-2 bg-roac-card glass-light rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-roac-border shrink-0 cursor-pointer"
    >
      <span style={{ fontSize: isMobile ? 13 : 14 }}><img src="/token1.png" width={20} /></span>
      {loading ? (
        <span style={{ color: "#555", fontWeight: 400, fontSize: 11 }}>…</span>
      ) : (
        <span>{balance.toLocaleString()}{!isMobile && " coins"}</span>
      )}
    </div>
  );
}