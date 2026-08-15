"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";

type RegisterModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isLoggedIn: boolean;
  handleBookSeat: () => void;
};

const RegisterModalContext = createContext<RegisterModalContextType | null>(null);

export function RegisterModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const isLoggedIn = !!user;

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const handleBookSeat = useCallback(() => {
    if (isLoggedIn) {
      router.push("/no-code-ai/pricing");
    } else {
      openModal();
    }
  }, [isLoggedIn, router, openModal]);

  return (
    <RegisterModalContext.Provider
      value={{ isOpen, openModal, closeModal, isLoggedIn, handleBookSeat }}
    >
      {children}
    </RegisterModalContext.Provider>
  );
}

export function useRegisterModal() {
  const ctx = useContext(RegisterModalContext);
  if (!ctx) {
    throw new Error("useRegisterModal must be used within RegisterModalProvider");
  }
  return ctx;
}