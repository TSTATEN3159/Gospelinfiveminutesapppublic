interface FeatureGuardOptions {
  featureName: string;
  userMessage: string;
}

/**
 * Defensive wrapper for async feature operations.
 * Catches all errors, logs them, and returns null on failure.
 * Prevents one feature failure from crashing the entire app.
 * 
 * Usage:
 * const result = await runSafely(
 *   { featureName: "Bible Search", userMessage: "..." },
 *   async () => await someService.method()
 * );
 * if (!result) return; // error already logged
 */
export async function runSafely<T>(
  options: FeatureGuardOptions,
  operation: () => Promise<T>
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    console.error(`[${options.featureName}] Error:`, error);
    console.error(`User message: ${options.userMessage}`);
    
    // Dispatch global error event for centralized error banner
    window.dispatchEvent(
      new CustomEvent("app-error", {
        detail: { message: options.userMessage }
      })
    );
    
    // Return null to indicate failure
    // Calling code should handle showing the user message via toast
    return null;
  }
}
