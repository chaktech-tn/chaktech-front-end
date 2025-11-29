"use client";
import { initPostHog } from "@utils/posthog";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
if (typeof window !== "undefined") {
  require("bootstrap");
}

export default function MainProvider({ children }) {
  // Initialize PostHog on client-side mount
  useEffect(() => {
    initPostHog();
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
