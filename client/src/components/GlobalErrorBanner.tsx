import { useEffect, useState, useRef } from "react";
import { AlertCircle, X } from "lucide-react";

export const GlobalErrorBanner = () => {
  const [message, setMessage] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ message: string }>;
      
      // Clear any existing timeout to prevent premature dismissal
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      setMessage(custom.detail.message);

      // Set new timeout and track it
      timeoutRef.current = setTimeout(() => {
        setMessage(null);
        timeoutRef.current = null;
      }, 5000);
    };

    window.addEventListener("app-error", handler as EventListener);

    return () => {
      window.removeEventListener("app-error", handler as EventListener);
      
      // Clear timeout on unmount to prevent setState on unmounted component
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleDismiss = () => {
    // Clear timeout when manually dismissing
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setMessage(null);
  };

  if (!message) return null;

  return (
    <div
      className="fixed top-4 left-4 right-4 z-[9999] animate-in slide-in-from-top-5 fade-in duration-300"
      style={{ maxWidth: "600px", margin: "0 auto" }}
    >
      <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500 dark:bg-red-600 text-white shadow-2xl backdrop-blur-xl border border-red-400/20">
        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-semibold mb-1">Error</div>
          <div className="text-sm text-white/90 break-words">{message}</div>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
          aria-label="Dismiss"
          data-testid="button-dismiss-error"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
