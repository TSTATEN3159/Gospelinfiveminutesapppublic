import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { safeLocalStorage } from "@/utils/capabilities";

interface VoiceSettings {
  selectedVoiceIndex: number | null;
  setSelectedVoiceIndex: (index: number | null) => void;
}

const VoiceSettingsContext = createContext<VoiceSettings | undefined>(undefined);

export const VoiceSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedVoiceIndex, setVoiceIndexState] = useState<number | null>(null);

  useEffect(() => {
    const stored = safeLocalStorage.getItem("preferredVoiceIndex");
    if (stored) {
      const index = parseInt(stored, 10);
      if (!isNaN(index)) {
        setVoiceIndexState(index);
      }
    }
  }, []);

  const setSelectedVoiceIndex = (index: number | null) => {
    setVoiceIndexState(index);
    if (index === null) {
      safeLocalStorage.removeItem("preferredVoiceIndex");
    } else {
      safeLocalStorage.setItem("preferredVoiceIndex", index.toString());
    }
  };

  return (
    <VoiceSettingsContext.Provider value={{ selectedVoiceIndex, setSelectedVoiceIndex }}>
      {children}
    </VoiceSettingsContext.Provider>
  );
};

export const useVoiceSettings = () => {
  const ctx = useContext(VoiceSettingsContext);
  if (!ctx) throw new Error("useVoiceSettings must be inside VoiceSettingsProvider");
  return ctx;
};
