import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type TextScaleContextValue = {
  scale: number;
  setScale: (value: number) => void;
};

const TextScaleContext = createContext<TextScaleContextValue | undefined>(
  undefined
);

const MIN_SCALE = 0.8;
const MAX_SCALE = 1.6;
const STEP = 0.02;

export const TextScaleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [scale, setScaleState] = useState<number>(() => {
    const stored = typeof window !== "undefined"
      ? window.localStorage.getItem("text-scale")
      : null;
    return stored ? Number(stored) || 1 : 1;
  });

  const setScale = (value: number) => {
    const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
    setScaleState(clamped);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("text-scale", String(clamped));
      document.documentElement.style.setProperty("--text-scale", String(clamped));
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--text-scale", String(scale));
  }, []);

  useEffect(() => {
    let lastDistance: number | null = null;

    const getDistance = (touches: TouchList) => {
      const [t1, t2] = [touches[0], touches[1]];
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      return Math.hypot(dx, dy);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        lastDistance = getDistance(e.touches);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && lastDistance !== null) {
        const distance = getDistance(e.touches);
        const delta = distance - lastDistance;

        const nextScale = scale + (delta * STEP) / 100;
        setScale(nextScale);

        lastDistance = distance;
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        lastDistance = null;
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [scale]);

  return (
    <TextScaleContext.Provider value={{ scale, setScale }}>
      {children}
    </TextScaleContext.Provider>
  );
};

export const useTextScale = () => {
  const ctx = useContext(TextScaleContext);
  if (!ctx) {
    throw new Error("useTextScale must be used within a TextScaleProvider");
  }
  return ctx;
};
