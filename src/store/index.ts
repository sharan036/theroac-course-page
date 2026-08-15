import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import notificationReducer from "./slices/notificationSlice";
import aiInsightReducer from "./slices/aiInsightSlice";

export const store = configureStore({
  reducer: { 
    auth: authReducer, 
    notifications: notificationReducer,
    aiInsight:  aiInsightReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;