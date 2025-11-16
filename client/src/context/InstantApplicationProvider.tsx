// client/src/context/InstantApplicationProvider.tsx

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { instantApplicationService, VerseData, ApplicationData } from "@/services/instantApplicationService";
import { ScriptureReferenceSelection } from "@/components/ScriptureReferencePicker";

interface InstantApplicationState {
  // Selection state
  selection: ScriptureReferenceSelection | null;
  
  // Verse data
  verseText: string;
  verseReference: string;
  
  // Application data
  application: string;
  applicationReference: string;
  
  // Loading states
  loadingVerse: boolean;
  generatingApplication: boolean;
  
  // Error states
  verseError: string | null;
  applicationError: string | null;
}

interface InstantApplicationActions {
  setSelection: (selection: ScriptureReferenceSelection | null) => void;
  loadVerse: (reference: string) => Promise<boolean>;
  generateApplication: (verse: string, reference: string) => Promise<boolean>;
  reset: () => void;
  clearErrors: () => void;
}

type InstantApplicationContextValue = InstantApplicationState & InstantApplicationActions;

const InstantApplicationContext = createContext<InstantApplicationContextValue | null>(null);

interface InstantApplicationProviderProps {
  children: ReactNode;
}

export function InstantApplicationProvider({ children }: InstantApplicationProviderProps) {
  // Selection state
  const [selection, setSelection] = useState<ScriptureReferenceSelection | null>(null);
  
  // Verse state
  const [verseText, setVerseText] = useState("");
  const [verseReference, setVerseReference] = useState("");
  const [loadingVerse, setLoadingVerse] = useState(false);
  const [verseError, setVerseError] = useState<string | null>(null);
  
  // Application state
  const [application, setApplication] = useState("");
  const [applicationReference, setApplicationReference] = useState("");
  const [generatingApplication, setGeneratingApplication] = useState(false);
  const [applicationError, setApplicationError] = useState<string | null>(null);

  // In-flight request tracking to prevent concurrent request leakage
  const [currentVerseRequest, setCurrentVerseRequest] = useState<string | null>(null);
  const [currentApplicationRequest, setCurrentApplicationRequest] = useState<string | null>(null);

  // Load verse action with concurrency guard
  const loadVerse = useCallback(async (reference: string): Promise<boolean> => {
    // Prevent concurrent requests from overwriting each other
    const requestId = `verse-${Date.now()}-${Math.random()}`;
    setCurrentVerseRequest(requestId);
    
    setLoadingVerse(true);
    setVerseError(null);

    const result = await instantApplicationService.fetchVerse(reference);

    // Only update state if this is still the current request
    let wasCommitted = false;
    setCurrentVerseRequest((current) => {
      if (current === requestId) {
        wasCommitted = true;
        
        if (result.success && result.data) {
          // Success: Replace old verse and clear application (new verse context)
          setVerseText(result.data.text);
          setVerseReference(result.data.reference);
          setApplication("");
          setApplicationReference("");
        } else {
          // Error: Set error flag but keep existing verse/application visible
          setVerseError(result.error || "Failed to load verse");
        }
        setLoadingVerse(false);
        return null;
      }
      return current;
    });

    return wasCommitted && result.success;
  }, []);

  // Generate application action with concurrency guard
  const generateApplication = useCallback(async (verse: string, reference: string): Promise<boolean> => {
    // Prevent concurrent requests from overwriting each other
    const requestId = `application-${Date.now()}-${Math.random()}`;
    setCurrentApplicationRequest(requestId);
    
    setGeneratingApplication(true);
    setApplicationError(null);

    const result = await instantApplicationService.generateApplication(verse, reference);

    // Only update state if this is still the current request
    let wasCommitted = false;
    setCurrentApplicationRequest((current) => {
      if (current === requestId) {
        wasCommitted = true;
        
        if (result.success && result.data) {
          // Success: Replace old application with new one
          setApplication(result.data.application);
          setApplicationReference(result.data.reference);
        } else {
          // Error: Set error flag but keep existing application visible
          setApplicationError(result.error || "Failed to generate application");
        }
        setGeneratingApplication(false);
        return null;
      }
      return current;
    });

    return wasCommitted && result.success;
  }, []);

  // Reset all state
  const reset = useCallback(() => {
    setSelection(null);
    setVerseText("");
    setVerseReference("");
    setApplication("");
    setApplicationReference("");
    setLoadingVerse(false);
    setGeneratingApplication(false);
    setVerseError(null);
    setApplicationError(null);
    setCurrentVerseRequest(null);
    setCurrentApplicationRequest(null);
  }, []);

  // Clear errors only
  const clearErrors = useCallback(() => {
    setVerseError(null);
    setApplicationError(null);
  }, []);

  const value: InstantApplicationContextValue = {
    // State
    selection,
    verseText,
    verseReference,
    application,
    applicationReference,
    loadingVerse,
    generatingApplication,
    verseError,
    applicationError,
    
    // Actions
    setSelection,
    loadVerse,
    generateApplication,
    reset,
    clearErrors,
  };

  return (
    <InstantApplicationContext.Provider value={value}>
      {children}
    </InstantApplicationContext.Provider>
  );
}

// Custom hook to use the context
export function useInstantApplication() {
  const context = useContext(InstantApplicationContext);
  
  if (!context) {
    throw new Error("useInstantApplication must be used within InstantApplicationProvider");
  }
  
  return context;
}
