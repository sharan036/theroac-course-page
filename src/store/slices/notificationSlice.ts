import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notifications as fetchNotificationsApi } from "@/src/lib/api/client";
import { UINotification } from "@/src/lib/api/types";
import { RootState } from "@/src/store";
import axiosInstance from "@/src/lib/axios";

interface NotificationState {
  notifications: UINotification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const userRole = state.auth?.user?.role || "candidate";
      const response = await fetchNotificationsApi(userRole);
      return response.notifications || response || [];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message || "Failed to fetch notifications");
    }
  }
);

// ── Thunk: hits backend + updates local state ────────────────────────────────
export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notificationId: string, thunkAPI) => {
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || "";
      await axiosInstance.put(`${API}/notifications/${notificationId}/read`);
      return notificationId;
    } catch (error: any) {
      // Still update UI even if API fails
      return notificationId;
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (_, thunkAPI) => {
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || "";
      await axiosInstance.put(`${API}/notifications/mark-all-read`);
      return true;
    } catch {
      return true;
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected,  (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── markAsRead ──
      .addCase(markAsRead.fulfilled, (state, action) => {
        const n = state.notifications.find((n) => n.id === action.payload);
        if (n) {
          n.read = true;       // ← was n.isRead — matches your API object
          n.readAt = new Date().toISOString();
        }
      })

      // ── markAllAsRead ──
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((n) => ({
          ...n,
          read: true,
          readAt: new Date().toISOString(),
        }));
      });
  },
});

export default notificationSlice.reducer;