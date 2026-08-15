import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/src/lib/axios";
import Cookies from "js-cookie";
import axios from "axios";

const rawAxios = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.theroac.com/api" });
export type UserRole = "candidate" | "recruiter" | "admin";

export interface User {
    id: string;
    name: string;
    fullName: string;
    email: string;
    profilePicture: string | null;
    phone: string;
    city: string | null;
    state: string | null;
    country: string | null;
    bio: string | null;
    role: "candidate" | "recruiter" | "admin";
    isVerified: boolean;
    headline: string;
    location: string;
    about: string;
    resumePath: string | null;
    resumeUrl?: string | null;
    skills: string[];
    experiences: [];
    education: [];
    badges: [];
    company: null;
    preferences: {
        emailNotifications: true;
        pushNotifications: true;
        darkMode: false;
    };
    profileScore: number;
    jobMatches: number;
    status: "active" | "inactive" | "banned";
    avatarUrl?: string;
    companyName?: string;
    createdAt: string;
    lastLogin: string;
}

type LoginResp2FASetup = {
    requiresTwoFactorSetup: true;
    tempToken: string;
    message: string;
    user: User;
};

type LoginResp2FAChallenge = {
    requiresTwoFactor: true;
    tempToken: string;
    message?: string;
};

type LoginRespNormal = {
    token: string;
    user: User;
    tempToken: string;
    requiresTwoFactorSetup?: false;
    requiresTwoFactor?: false;
};

type LoginPayload = LoginResp2FASetup | LoginResp2FAChallenge | LoginRespNormal;

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    requiresTwoFactorSetup: boolean;
    requiresTwoFactor: boolean;
    tempToken: string | null;
    twoFactorSetupData: { qrCode: string; manualKey: string } | null;
    backupCodes: string[];
    setupComplete: boolean;
    streakToast: { earned: number; streak: number; isBonus: boolean } | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    requiresTwoFactorSetup: false,
    requiresTwoFactor: false,
    tempToken: null,
    twoFactorSetupData: null,
    backupCodes: [],
    setupComplete: false,
    streakToast: null,
};

export const pingStreak = createAsyncThunk(
    "auth/pingStreak",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post("/auth/ping");
            return data as { earned: number; streak: number; alreadyDone: boolean };
        } catch {
            return rejectWithValue(null);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post<LoginPayload>("/auth/login", credentials);
            if ("token" in data && data.token) {
                Cookies.set("auth_token", data.token, { expires: 7, sameSite: "Lax", path: "/", domain: ".theroac.com" });
            }
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message || "Login failed");
        }
    }
);

export const setupTwoFactor = createAsyncThunk(
    "auth/setupTwoFactor",
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState() as { auth: AuthState };
            console.log("auth", auth);
            const { data } = await rawAxios.post<{ qrCode: string; manualKey: string }>(
                "/auth/2fa/setup?id=" + auth.user?.id,
                {},
                { headers: { Authorization: `Bearer ${auth.tempToken}` } }
            );
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to initialise 2FA");
        }
    }
);

export const verifyTwoFactorSetup = createAsyncThunk(
    "auth/verifyTwoFactorSetup",
    async (otp: string, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState() as { auth: AuthState };
            console.log("auth", auth);
            const { data } = await rawAxios.post<{ message: string; backupCodes: string[] }>(
                "/auth/2fa/verify-setup",
                { otp },
                { headers: { Authorization: `Bearer ${auth.tempToken}` } }
            );
            return data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Invalid OTP. Make sure your device clock is correct."
            );
        }
    }
);

export const validateTwoFactorLogin = createAsyncThunk(
    "auth/validateTwoFactorLogin",
    async (otp: string, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState() as { auth: AuthState };
            const { data } = await rawAxios.post<{ message: string; token: string; user: User }>(
                "/auth/2fa/validate",
                { tempToken: auth.tempToken, otp }
            );
            Cookies.set("auth_token", data.token, { expires: 7, sameSite: "Lax", path: "/", domain: ".theroac.com" });
            return data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Invalid code. Check your authenticator app."
            );
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.get("/users/me");
            const user = data.user || data.data?.user || data;
            return user as User;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Session expired or invalid token");
        }
    }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
    try {
        await axiosInstance.post("/auth/logout");
    } catch (_) {
    }
    Cookies.remove("auth_token", { path: "/", domain: ".theroac.com" });
});

export const registerUser = createAsyncThunk(
    "auth/register",
    async (
        payload: { fullName: string; email: string; phone: string; password: string; role: UserRole },
        { rejectWithValue }
    ) => {
        try {
            const { data } = await axiosInstance.post("/auth/register", payload);
            if (data.needsVerification || !data.token) {
                return rejectWithValue(
                    data.message || "Please check your email to verify your account."
                );
            }
            Cookies.set("auth_token", data.token, { expires: 7, sameSite: "Lax", path: "/", domain: ".theroac.com" });
            return data as { token: string; user: User };
        } catch (err: any) {
            let errorMessage = err.response?.data?.message || err.message || "Signup failed";
            if (errorMessage === "Network Error" || err.code === "ERR_NETWORK") {
                errorMessage = "Network error: Please check your connection and ensure the server is running.";
            }
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                errorMessage = Array.isArray(errors)
                    ? errors.map((e: any) => e.message || e).join(", ")
                    : errors;
            }
            return rejectWithValue(errorMessage);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => { state.error = null; },
        clearBackupCodes: (state) => {
            state.backupCodes = [];
            state.setupComplete = false;
        },
        clearStreakToast: (state) => { state.streakToast = null; },
        setTempToken: (state, action: PayloadAction<string>) => {
            state.tempToken = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(pingStreak.fulfilled, (s, a) => {
                const { earned, streak, alreadyDone } = a.payload;
                if (!alreadyDone && earned > 0) {
                    s.streakToast = { earned, streak, isBonus: streak % 7 === 0 };
                }
            })
            .addCase(loginUser.pending, (s) => {
                s.isLoading = true;
                s.error = null;
            })
            .addCase(loginUser.fulfilled, (s, a) => {
                s.isLoading = false;
                s.error = null;
                const p = a.payload;
                if ("requiresTwoFactorSetup" in p && p.requiresTwoFactorSetup) {
                    s.user = p.user;
                    s.requiresTwoFactorSetup = true;
                    s.requiresTwoFactor = false;
                    s.tempToken = p.tempToken;
                } else if ("requiresTwoFactor" in p && p.requiresTwoFactor) {
                    s.requiresTwoFactor = true;
                    s.requiresTwoFactorSetup = false;
                    s.tempToken = p.tempToken;
                } else {
                    const normal = p as LoginRespNormal;
                    s.user = normal.user;
                    s.token = normal.token;
                    s.isAuthenticated = true;
                    s.requiresTwoFactorSetup = false;
                    s.requiresTwoFactor = false;
                    s.tempToken = normal.tempToken || null;
                }
            })
            .addCase(loginUser.rejected, (s, a) => {
                s.isLoading = false;
                s.error = a.payload as string;
                s.isAuthenticated = false;
                s.token = null;
                s.user = null;
            })
            .addCase(setupTwoFactor.pending, (s) => {
                s.isLoading = true;
                s.error = null;
            })
            .addCase(setupTwoFactor.fulfilled, (s, a) => {
                s.isLoading = false;
                s.twoFactorSetupData = a.payload;
            })
            .addCase(setupTwoFactor.rejected, (s, a) => {
                s.isLoading = false;
                s.error = a.payload as string;
            })
            .addCase(verifyTwoFactorSetup.pending, (s) => {
                s.isLoading = true;
                s.error = null;
            })
            .addCase(verifyTwoFactorSetup.fulfilled, (s, a) => {
                s.isLoading = false;
                s.backupCodes = a.payload.backupCodes;
                s.setupComplete = true;
                s.twoFactorSetupData = null;
                s.tempToken = null;
                s.requiresTwoFactorSetup = false;
            })
            .addCase(verifyTwoFactorSetup.rejected, (s, a) => {
                s.isLoading = false;
                s.error = a.payload as string;
            })
            .addCase(validateTwoFactorLogin.pending, (s) => {
                s.isLoading = true;
                s.error = null;
            })
            .addCase(validateTwoFactorLogin.fulfilled, (s, a) => {
                s.isLoading = false;
                s.user = a.payload.user;
                s.token = a.payload.token;
                s.isAuthenticated = true;
                s.error = null;
                s.requiresTwoFactor = false;
                s.tempToken = null;
            })
            .addCase(validateTwoFactorLogin.rejected, (s, a) => {
                s.isLoading = false;
                s.error = a.payload as string;
            })
            .addCase(fetchCurrentUser.pending, (s) => { s.isLoading = true; })
            .addCase(fetchCurrentUser.fulfilled, (s, a) => {
                s.isLoading = false;
                s.user = a.payload;
                s.isAuthenticated = true;
                s.error = null;
                s.token = Cookies.get("auth_token") || s.token || null;
            })
            .addCase(fetchCurrentUser.rejected, (s) => {
                s.isLoading = false;
                if (!Cookies.get("auth_token")) {
                    s.user = null;
                    s.token = null;
                    s.isAuthenticated = false;
                    Cookies.remove("auth_token", { path: "/", domain: ".theroac.com" });
                }
            })
            .addCase(registerUser.pending, (s) => {
                s.isLoading = true;
                s.error = null;
            })
            .addCase(registerUser.fulfilled, (s, a) => {
                s.isLoading = false;
                s.user = a.payload.user;
                s.token = a.payload.token;
                s.isAuthenticated = true;
                s.error = null;
            })
            .addCase(registerUser.rejected, (s, a) => {
                s.isLoading = false;
                s.error = a.payload as string;
                s.isAuthenticated = false;
                s.token = null;
                s.user = null;
            })
            .addCase(logoutUser.fulfilled, (s) => {
                s.user = null;
                s.token = null;
                s.isAuthenticated = false;
                s.error = null;
                s.requiresTwoFactorSetup = false;
                s.requiresTwoFactor = false;
                s.tempToken = null;
                s.twoFactorSetupData = null;
                s.backupCodes = [];
                s.setupComplete = false;
            });
    },
});

export const { clearError, clearBackupCodes, clearStreakToast, setTempToken } = authSlice.actions;
export default authSlice.reducer;