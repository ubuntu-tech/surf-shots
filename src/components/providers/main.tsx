'use client'

import { PostHogProvider } from "posthog-js/react";
import { ToastProvider } from "../Toast";
import SessionProvider from "./SessionProvider/SessionProvider";

export default function MainProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <ToastProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
      </ToastProvider>
    </PostHogProvider>
  )
}
