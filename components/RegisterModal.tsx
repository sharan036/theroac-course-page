"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Eye, EyeOff, Loader2, MailCheck } from "lucide-react";
import { useRegisterModal } from "./RegisterModalContext";
import type { AppDispatch, RootState } from "@/src/store";
import { registerUser, clearError } from "@/src/store/slices/authSlice";
import { validateSignupForm } from "@/src/lib/validation";

export default function RegisterModal() {
  const { isOpen, closeModal } = useRegisterModal();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((s: RootState) => s.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [agreeError, setAgreeError] = useState("");

  // Distinct "needs verification" success state — not an error
  const [needsVerification, setNeedsVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    // Reset the verification screen if they close and reopen later
    setNeedsVerification(false);
    dispatch(clearError());
    closeModal();
  };

  const handleFullNameChange = (v: string) => {
    setFullName(v);
    if (validationErrors.fullName) setValidationErrors((p) => ({ ...p, fullName: "" }));
  };
  const handleEmailChange = (v: string) => {
    setEmail(v);
    if (validationErrors.email) setValidationErrors((p) => ({ ...p, email: "" }));
  };
  const handlePasswordChange = (v: string) => {
    setPassword(v);
    if (validationErrors.password) setValidationErrors((p) => ({ ...p, password: "" }));
  };
  const handlePhoneChange = (v: string) => {
    setPhone(v);
    if (validationErrors.phone) setValidationErrors((p) => ({ ...p, phone: "" }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateSignupForm(fullName, email, password, phone);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }
    if (password !== confirmPassword) {
      setValidationErrors((p) => ({ ...p, password: "Passwords do not match." }));
      return;
    }
    if (!agreed) {
      setAgreeError("You must agree to the Terms & Conditions and Refund Policy.");
      return;
    }
    setAgreeError("");
    setValidationErrors({});
    dispatch(clearError());

    const result = await dispatch(
      registerUser({ fullName, email, phone, password, role: "candidate" })
    );

    if (registerUser.fulfilled.match(result)) {
      closeModal();
      window.location.href = "/no-code-ai/pricing";
      return;
    }

    // registerUser.rejected: could be a real error, or "please verify your email"
    const message = (result.payload as string) || "";
    if (/verify/i.test(message)) {
      dispatch(clearError()); // don't also show the red banner
      setRegisteredEmail(email);
      setNeedsVerification(true);
    }
    // otherwise: leave `error` in redux state to show the normal red banner
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[420px] rounded-2xl border border-[#ff6f00]/40 bg-[#0d0d0d] p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>

        {needsVerification ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ff6f00]/10 border border-[#ff6f00]/30">
              <MailCheck size={24} className="text-[#ff6f00]" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-white">Check your email</h2>
            <p className="mb-6 text-sm leading-relaxed text-white/60">
              We&apos;ve sent a verification link to{" "}
              <span className="text-white/90">{registeredEmail}</span>. Verify
              your account, then log in to continue to payment.
            </p>
            <a
              href="/auth/login?redirect=/no-code-ai/pricing"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6f00] py-3 text-sm font-bold text-white transition hover:brightness-105"
            >
              Go to Login
            </a>

            <button
              type="button"
              onClick={handleClose}
              className="mt-3 text-xs font-medium text-white/50 hover:text-white/70"
            >
              I&apos;ll verify later
            </button>
          </div>
        ) : (
          <>
            <h2 className="mb-6 text-center text-2xl font-bold text-white">
              Register <span className="text-[#ff6f00]">Now</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-[13px] text-red-400">
                  <span>{error}</span>
                  <button
                    type="button"
                    onClick={() => dispatch(clearError())}
                    className="ml-2 text-lg leading-none text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </div>
              )}

              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => handleFullNameChange(e.target.value)}
                  className={`w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#ff6f00] ${
                    validationErrors.fullName ? "border-red-500" : "border-white/15"
                  }`}
                  autoComplete="name"
                />
                {validationErrors.fullName && (
                  <p className="mt-1 text-xs text-red-400">{validationErrors.fullName}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={`w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#ff6f00] ${
                    validationErrors.email ? "border-red-500" : "border-white/15"
                  }`}
                  autoComplete="email"
                />
                {validationErrors.email && (
                  <p className="mt-1 text-xs text-red-400">{validationErrors.email}</p>
                )}
              </div>
              <div>
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#ff6f00]"
                    autoComplete="tel"
                />
                {validationErrors.phone && (
                    <p className="mt-1 text-xs text-red-400">{validationErrors.phone}</p>
                )}
              </div>
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className={`w-full rounded-xl border bg-transparent px-4 py-3 pr-11 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#ff6f00] ${
                      validationErrors.password ? "border-red-500" : "border-white/15"
                    }`}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="mt-1 text-xs text-red-400">{validationErrors.password}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 pr-11 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#ff6f00]"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6f00] py-3 text-sm font-bold text-white transition hover:brightness-105 disabled:opacity-60"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                {isLoading ? "Registering..." : "Register"}
              </button>

              <div>
                <label className="flex items-start gap-2 pt-1 text-xs leading-relaxed text-white/70">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      if (agreeError) setAgreeError("");
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#ff6f00]"
                  />
                  <span>
                    I agree to the{" "}
                    <a href="/terms" target="_blank" className="text-[#ff6f00] underline">
                      Terms &amp; Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/refund-policy" target="_blank" className="text-[#ff6f00] underline">
                      Refund Policy
                    </a>
                    .
                  </span>
                </label>
                {agreeError && <p className="mt-1 text-xs text-red-400">{agreeError}</p>}
              </div>

              <p className="pt-2 text-center text-xs text-white/50">
                Already have an account?{" "}
                <a href="/auth/login?redirect=/no-code-ai/pricing" className="font-semibold text-[#ff6f00]">
                  Login
                </a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}