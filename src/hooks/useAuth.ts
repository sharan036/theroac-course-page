"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState, AppDispatch } from "@/src/store";
import {
    loginUser,
    logoutUser,
    clearError,
    clearBackupCodes,
    setupTwoFactor,
    verifyTwoFactorSetup,
    validateTwoFactorLogin,
    UserRole,
    pingStreak,
    clearStreakToast,
} from "@/src/store/slices/authSlice";
import { useEffect } from "react";

const ROLE_REDIRECT: Record<UserRole, string> = {
    candidate: "/dashboard/candidate",
    recruiter:  "/dashboard/recruiter",
    admin:      "/dashboard/admin",
};

export function useAuth() {
    const dispatch = useDispatch<AppDispatch>();
    const router   = useRouter();
    const auth     = useSelector((s: RootState) => s.auth);

    const isAuthenticated = auth.isAuthenticated;
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(pingStreak());
        }
    }, [isAuthenticated, dispatch]);

    const login = async (email: string, password: string, redirectTo?: string) => {
        const result = await dispatch(loginUser({ email, password }));
        if (!loginUser.fulfilled.match(result)) return;

        const p = result.payload;

        if ("requiresTwoFactorSetup" in p && p.requiresTwoFactorSetup) {
            // Admin who hasn't configured 2FA yet → setup wizard
            // (redirect target isn't relevant here — 2FA setup is mandatory first)
            router.push("/auth/2fa-setup");

        } else if ("requiresTwoFactor" in p && p.requiresTwoFactor) {
            // User with 2FA already enabled → OTP challenge page
            // carry the redirect target forward so the challenge step can honor it
            router.push(
                redirectTo
                    ? `/auth/2fa-challenge?redirect=${encodeURIComponent(redirectTo)}`
                    : "/auth/2fa-challenge"
            );

        } else {
            // Normal login
            const role = (p as { user: { role: UserRole } }).user.role;
            router.push(redirectTo || ROLE_REDIRECT[role]);
        }
    };

    const initTwoFactorSetup = async () => {
        const result = await dispatch(setupTwoFactor());
        return setupTwoFactor.fulfilled.match(result) ? result.payload : null;
    };

    const confirmTwoFactorSetup = async (otp: string) => {
        const result = await dispatch(verifyTwoFactorSetup(otp));
        return verifyTwoFactorSetup.fulfilled.match(result) ? result.payload.backupCodes : null;
    };

    const finishTwoFactorSetup = () => {
        dispatch(clearBackupCodes());
        router.push("/auth/login?setup=complete");
    };

    const submitTwoFactorChallenge = async (otp: string, redirectTo?: string) => {
        const result = await dispatch(validateTwoFactorLogin(otp));
        if (validateTwoFactorLogin.fulfilled.match(result)) {
            const role = result.payload.user.role as UserRole;
            router.push(redirectTo || ROLE_REDIRECT[role]);
            return true;
        }
        return false;
    };

    const logout = async () => {
        await dispatch(logoutUser());
        router.push("/auth/login");
    };

    return {
        ...auth,
        login,
        logout,
        initTwoFactorSetup,
        confirmTwoFactorSetup,
        finishTwoFactorSetup,
        submitTwoFactorChallenge,
        clearError:      () => dispatch(clearError()),
        clearBackupCodes: () => dispatch(clearBackupCodes()),
        clearStreakToast:  () => dispatch(clearStreakToast()),
    };
}