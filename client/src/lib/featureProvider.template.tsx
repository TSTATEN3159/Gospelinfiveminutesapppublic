/**
 * Feature Provider Template
 * 
 * This file serves as a template/reference for creating feature-specific providers.
 * Copy this pattern when creating a new feature provider.
 * 
 * Usage Example:
 * 
 * 1. Copy this file and rename it (e.g., PlainMeaningProvider.tsx)
 * 2. Replace "Feature" with your feature name
 * 3. Define your feature's state interface
 * 4. Implement your feature's actions/methods
 * 5. Import and use the service layer for API calls
 * 
 * Pattern:
 * - State lives in Context
 * - Actions are methods that update state
 * - Service layer handles all API/network calls
 * - TanStack Query can be used for caching via queryClient
 */

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { ServiceResult } from "./featureService";

// ============================================================================
// 1. DEFINE YOUR FEATURE STATE
// ============================================================================

interface FeatureState {
  // Add your feature's state properties
  loading: boolean;
  error: string | null;
  data: any | null; // Replace 'any' with your actual data type
}

// ============================================================================
// 2. DEFINE YOUR FEATURE CONTEXT
// ============================================================================

interface FeatureContextValue extends FeatureState {
  // Add your feature's actions/methods
  performAction: (input: string) => Promise<void>;
  reset: () => void;
}

const FeatureContext = createContext<FeatureContextValue | null>(null);

// ============================================================================
// 3. CREATE YOUR FEATURE PROVIDER
// ============================================================================

interface FeatureProviderProps {
  children: ReactNode;
}

export function FeatureProvider({ children }: FeatureProviderProps) {
  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  // Actions
  const performAction = useCallback(async (input: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // Call your service layer here
      // Example:
      // const result = await yourFeatureService.doSomething(input);
      // 
      // if (result.success) {
      //   setData(result.data);
      // } else {
      //   setError(result.error || 'An error occurred');
      // }

      // Placeholder - replace with actual service call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData({ message: `Processed: ${input}` });
    } catch (err) {
      console.error('[FeatureProvider] Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  // Context value
  const value: FeatureContextValue = {
    loading,
    error,
    data,
    performAction,
    reset,
  };

  return (
    <FeatureContext.Provider value={value}>
      {children}
    </FeatureContext.Provider>
  );
}

// ============================================================================
// 4. CREATE YOUR FEATURE HOOK
// ============================================================================

export function useFeature() {
  const context = useContext(FeatureContext);
  
  if (!context) {
    throw new Error('useFeature must be used within FeatureProvider');
  }
  
  return context;
}

// ============================================================================
// 5. USAGE EXAMPLE IN YOUR PAGE/COMPONENT
// ============================================================================

/*
import { FeatureProvider, useFeature } from '@/context/FeatureProvider';
import { FeatureBoundary } from '@/components/FeatureBoundary';

function FeatureScreen() {
  const { loading, error, data, performAction, reset } = useFeature();
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <button onClick={() => performAction('test')}>Perform Action</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default function FeaturePage(props: { onNavigate?: (page: string) => void }) {
  return (
    <FeatureBoundary 
      featureName="Your Feature Name"
      onBackHome={() => props.onNavigate?.('home')}
    >
      <FeatureProvider>
        <FeatureScreen />
      </FeatureProvider>
    </FeatureBoundary>
  );
}
*/
