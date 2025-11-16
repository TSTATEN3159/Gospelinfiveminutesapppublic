import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

type TextScaleContextValue = {
  scale: number;
  setScale: (value: number) => void;
};

const TextScaleContext = createContext<TextScaleContextValue>({
  scale: 1,
  setScale: () => {},
});

const MIN_SCALE = 0.8; // 80%
const MAX_SCALE = 1.6; // 160%
const STEP = 0.02;     // sensitivity

export const TextScaleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // initial from localStorage
  const [scale, setScaleState] = useState<number>(() => {
    if (typeof window === "undefined") return 1;
    const stored = window.localStorage.getItem("text-scale");
    const num = stored ? Number(stored) : 1;
    return Number.isFinite(num) ? num : 1;
  });

  // keep the latest scale in a ref so touch handlers always see it
  const scaleRef = useRef(scale);
  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  const applyScaleToDocument = (value: number) => {
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty(
        "--text-scale",
        String(value)
      );
    }
  };

  const setScale = (value: number) => {
    const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
    setScaleState(clamped);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("text-scale", String(clamped));
    }
    applyScaleToDocument(clamped);
  };

  // initialize CSS variable on mount
  useEffect(() => {
    applyScaleToDocument(scaleRef.current);
  }, []);

  // Global two-finger pinch handler
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastDistance: number | null = null;

    const getDistance = (touches: TouchList) => {
      const t1 = touches[0];
      const t2 = touches[1];
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      return Math.hypot(dx, dy);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        lastDistance = getDistance(e.touches);
        // Optional: prevent the system from starting its own page zoom
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && lastDistance !== null) {
        const distance = getDistance(e.touches);
        const delta = distance - lastDistance;

        const current = scaleRef.current;
        const next = current + (delta * STEP) / 100;

        setScale(next);
        lastDistance = distance;

        // Optional: keep the system from also zooming the webview
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        lastDistance = null;
      }
    };

    // Important: passive must be false if we call preventDefault()
    const options: AddEventListenerOptions = { passive: false };

    document.addEventListener("touchstart", handleTouchStart, options);
    document.addEventListener("touchmove", handleTouchMove, options);
    document.addEventListener("touchend", handleTouchEnd, options);
    document.addEventListener("touchcancel", handleTouchEnd, options);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart, options as any);
      document.removeEventListener("touchmove", handleTouchMove, options as any);
      document.removeEventListener("touchend", handleTouchEnd, options as any);
      document.removeEventListener("touchcancel", handleTouchEnd, options as any);
    };
  }, []); // 👈 attach once, no dependency on scale

  return (
    <TextScaleContext.Provider value={{ scale, setScale }}>
      {children}
    </TextScaleContext.Provider>
  );
};

export const useTextScale = () => useContext(TextScaleContext);
