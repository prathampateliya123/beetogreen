"use client";

import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isPreloaderTransition, setIsPreloaderTransition] = useState(true);
  const [lenis, setLenis] = useState(null);

  const value = useMemo(
    () => ({
      isPreloaderDone,
      setIsPreloaderDone,
      isPreloaderTransition,
      setIsPreloaderTransition,
      lenis,
      setLenis,
    }),
    [isPreloaderDone, isPreloaderTransition, lenis]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
