"use client";

import { useEffect, useState } from "react";
import { fetchDashboardStats, fetchUsers } from "@/src/lib/api/client";
import type { DashboardStats, User } from "@/src/lib/api/types";

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes] = await Promise.all([
        fetchDashboardStats(),
        fetchUsers({ page: 1}),
      ]);

      setStats(statsRes);
      setUsers(usersRes.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    stats,
    users,
    loading,
    error,
    reload: loadDashboard,
  };
}