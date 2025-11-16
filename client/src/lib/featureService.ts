/**
 * Feature Service Utilities
 * 
 * Provides standardized patterns for creating safe, isolated service layers
 * that handle API calls with proper error handling and type safety.
 */

export interface ServiceResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  errorCode?: string;
}

export interface ServiceError {
  message: string;
  code?: string;
  originalError?: unknown;
}

/**
 * Creates a safe service function wrapper that catches all errors
 * and returns a standardized ServiceResult
 */
export function createServiceWrapper<TArgs extends any[], TResult>(
  serviceName: string,
  serviceFunction: (...args: TArgs) => Promise<TResult>
): (...args: TArgs) => Promise<ServiceResult<TResult>> {
  return async (...args: TArgs): Promise<ServiceResult<TResult>> => {
    try {
      const data = await serviceFunction(...args);
      return {
        success: true,
        data,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      const errorCode = (error as any)?.code || 'UNKNOWN_ERROR';
      
      console.error(`[${serviceName}] Service error:`, {
        error,
        args,
        timestamp: new Date().toISOString(),
      });

      return {
        success: false,
        error: errorMessage,
        errorCode,
      };
    }
  };
}

/**
 * Safe fetch wrapper with timeout and error handling
 */
export async function safeFetch<T>(
  url: string,
  options?: RequestInit & { timeout?: number }
): Promise<ServiceResult<T>> {
  const { timeout = 30000, ...fetchOptions } = options || {};

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      return {
        success: false,
        error: `HTTP ${response.status}: ${errorText}`,
        errorCode: `HTTP_${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        success: false,
        error: 'Request timeout - please check your connection and try again',
        errorCode: 'TIMEOUT',
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network request failed',
      errorCode: 'NETWORK_ERROR',
    };
  }
}

/**
 * Validates API response structure
 */
export function validateApiResponse<T>(
  response: any,
  validator: (data: any) => data is T
): ServiceResult<T> {
  if (!response) {
    return {
      success: false,
      error: 'Empty response from server',
      errorCode: 'EMPTY_RESPONSE',
    };
  }

  if (validator(response)) {
    return {
      success: true,
      data: response,
    };
  }

  return {
    success: false,
    error: 'Invalid response format from server',
    errorCode: 'INVALID_RESPONSE',
  };
}

/**
 * Retry logic for failed service calls
 */
export async function retryService<T>(
  serviceCall: () => Promise<ServiceResult<T>>,
  options: {
    maxRetries?: number;
    retryDelay?: number;
    retryCondition?: (result: ServiceResult<T>) => boolean;
  } = {}
): Promise<ServiceResult<T>> {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    retryCondition = (result) => !result.success && result.errorCode === 'NETWORK_ERROR',
  } = options;

  let lastResult: ServiceResult<T> | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    lastResult = await serviceCall();

    if (lastResult.success || !retryCondition(lastResult)) {
      return lastResult;
    }

    if (attempt < maxRetries - 1) {
      await new Promise((resolve) => setTimeout(resolve, retryDelay * (attempt + 1)));
    }
  }

  return lastResult || {
    success: false,
    error: 'All retry attempts failed',
    errorCode: 'MAX_RETRIES_EXCEEDED',
  };
}
