/**
 * Plain Meaning Feature Provider
 * 
 * Provides isolated state and actions for the Plain Meaning (AI Verse Simplifier) feature.
 * This keeps the feature's state completely separate from other features, preventing
 * state leakage and cross-feature interference.
 */

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { plainMeaningService, VerseData, PlainMeaningData } from "@/services/plainMeaningService";
import { ScriptureReferenceSelection } from "@/components/ScriptureReferencePicker";

interface PlainMeaningState {
  // Selection state
  selection: ScriptureReferenceSelection | null;
  
  // Verse data
  verseText: string;
  verseReference: string;
  
  // Plain meaning data
  plainMeaning: string;
  plainMeaningReference: string;
  
  // Loading states
  loadingVerse: boolean;
  generatingPlainMeaning: boolean;
  
  // Error states
  verseError: string | null;
  plainMeaningError: string | null;
}

interface PlainMeaningActions {
  setSelection: (selection: ScriptureReferenceSelection | null) => void;
  loadVerse: (reference: string) => Promise<boolean>;
  generatePlainMeaning: (verse: string, reference: string) => Promise<boolean>;
  reset: () => void;
  clearErrors: () => void;
}

type PlainMeaningContextValue = PlainMeaningState & PlainMeaningActions;

const PlainMeaningContext = createContext<PlainMeaningContextValue | null>(null);

interface PlainMeaningProviderProps {
  children: ReactNode;
}

export function PlainMeaningProvider({ children }: PlainMeaningProviderProps) {
  // Selection state
  const [selection, setSelection] = useState<ScriptureReferenceSelection | null>(null);
  
  // Verse state
  const [verseText, setVerseText] = useState("");
  const [verseReference, setVerseReference] = useState("");
  const [loadingVerse, setLoadingVerse] = useState(false);
  const [verseError, setVerseError] = useState<string | null>(null);
  
  // Plain meaning state
  const [plainMeaning, setPlainMeaning] = useState("");
  const [plainMeaningReference, setPlainMeaningReference] = useState("");
  const [generatingPlainMeaning, setGeneratingPlainMeaning] = useState(false);
  const [plainMeaningError, setPlainMeaningError] = useState<string | null>(null);

  // Load verse action
  const loadVerse = useCallback(async (reference: string): Promise<boolean> => {
    setLoadingVerse(true);
    setVerseError(null);
    setVerseText("");
    setVerseReference("");
    setPlainMeaning("");
    setPlainMeaningReference("");

    const result = await plainMeaningService.fetchVerse(reference);

    if (result.success && result.data) {
      setVerseText(result.data.text);
      setVerseReference(result.data.reference);
      setLoadingVerse(false);
      return true;
    } else {
      setVerseError(result.error || "Failed to load verse");
      setLoadingVerse(false);
      return false;
    }
  }, []);

  // Generate plain meaning action
  const generatePlainMeaning = useCallback(async (
    verse: string,
    reference: string
  ): Promise<boolean> => {
    setGeneratingPlainMeaning(true);
    setPlainMeaningError(null);
    setPlainMeaning("");

    const result = await plainMeaningService.generatePlainMeaning(verse, reference);

    if (result.success && result.data) {
      setPlainMeaning(result.data.plainMeaning);
      setPlainMeaningReference(result.data.reference);
      setGeneratingPlainMeaning(false);
      return true;
    } else {
      setPlainMeaningError(result.error || "Failed to generate plain meaning");
      setGeneratingPlainMeaning(false);
      return false;
    }
  }, []);

  // Reset action
  const reset = useCallback(() => {
    setSelection(null);
    setVerseText("");
    setVerseReference("");
    setPlainMeaning("");
    setPlainMeaningReference("");
    setLoadingVerse(false);
    setGeneratingPlainMeaning(false);
    setVerseError(null);
    setPlainMeaningError(null);
  }, []);

  // Clear errors action
  const clearErrors = useCallback(() => {
    setVerseError(null);
    setPlainMeaningError(null);
  }, []);

  const value: PlainMeaningContextValue = {
    // State
    selection,
    verseText,
    verseReference,
    plainMeaning,
    plainMeaningReference,
    loadingVerse,
    generatingPlainMeaning,
    verseError,
    plainMeaningError,
    
    // Actions
    setSelection,
    loadVerse,
    generatePlainMeaning,
    reset,
    clearErrors,
  };

  return (
    <PlainMeaningContext.Provider value={value}>
      {children}
    </PlainMeaningContext.Provider>
  );
}

export function usePlainMeaning() {
  const context = useContext(PlainMeaningContext);
  
  if (!context) {
    throw new Error("usePlainMeaning must be used within PlainMeaningProvider");
  }
  
  return context;
}
