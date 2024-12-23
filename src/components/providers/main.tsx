'use client'

import { PostHogProvider } from "posthog-js/react";
import { ToastProvider } from "../Toast";
import SessionProvider from "./SessionProvider/SessionProvider";
import { CartProvider } from "@/context/CartContext";

export default function MainProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <ToastProvider>
        <SessionProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </SessionProvider>
      </ToastProvider>
    </PostHogProvider>
  )
}
