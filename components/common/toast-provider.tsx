"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Toast = { id: number; title: string; description?: string };

type ToastContextValue = {
  pushToast: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = useCallback((title: string, description?: string) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((prev) => [...prev, { id, title, description }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const value = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed right-4 top-20 z-[80] space-y-2">
        {toasts.map((toast) => (
          <div key={toast.id} className="glass pointer-events-auto w-[320px] rounded-xl p-3 text-sm shadow-soft">
            <p className="font-semibold text-cream">{toast.title}</p>
            {toast.description && <p className="mt-1 text-xs text-muted">{toast.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast debe usarse dentro de ToastProvider");
  return context;
}
