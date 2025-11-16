/**
 * Plain Meaning Service Layer
 * 
 * Safely wraps the verse insights API calls with proper error handling
 * and standardized ServiceResult return types for the Plain Meaning feature.
 */

import { ServiceResult, retryService, validateApiResponse } from "@/lib/featureService";
import { verseInsightsService, VersePassageResponse, PlainMeaningResponse } from "./verseInsightsService";

export interface VerseData {
  text: string;
  reference: string;
}

export interface PlainMeaningData {
  plainMeaning: string;
  reference: string;
}

// Enhanced PlainMeaningResponse to include reference requirement
interface ValidatedPlainMeaningResponse extends PlainMeaningResponse {
  reference: string;
}

// Schema validators
function isVersePassageResponse(data: any): data is VersePassageResponse {
  return (
    data &&
    typeof data === 'object' &&
    typeof data.text === 'string' &&
    data.text.trim().length > 0 &&
    typeof data.reference === 'string' &&
    data.reference.trim().length > 0
  );
}

function isPlainMeaningResponse(data: any): data is PlainMeaningResponse {
  return (
    data &&
    typeof data === 'object' &&
    typeof data.plainMeaning === 'string' &&
    data.plainMeaning.trim().length > 0
  );
}

class PlainMeaningService {
  /**
   * Fetches a Bible verse passage by reference with retry and validation
   */
  async fetchVerse(reference: string): Promise<ServiceResult<VerseData>> {
    return retryService(
      async () => {
        try {
          const result = await verseInsightsService.fetchPassage(reference);
          
          // Validate response structure
          const validation = validateApiResponse(result, isVersePassageResponse);
          if (!validation.success) {
            return validation;
          }

          // Check for empty verse text
          if (!result.text || result.text.trim().length === 0) {
            return {
              success: false,
              error: "No verse text found for this reference",
              errorCode: "EMPTY_VERSE",
            };
          }

          return {
            success: true,
            data: {
              text: result.text,
              reference: result.reference || reference,
            },
          };
        } catch (error) {
          console.error("[PlainMeaningService] Fetch verse error:", error);
          
          const errorMessage = error instanceof Error 
            ? error.message 
            : "Failed to load verse. Please check the reference and try again.";
          
          return {
            success: false,
            error: errorMessage,
            errorCode: "FETCH_VERSE_ERROR",
          };
        }
      },
      {
        maxRetries: 2,
        retryDelay: 1000,
      }
    );
  }

  /**
   * Generates plain meaning explanation for a verse with retry and validation
   */
  async generatePlainMeaning(
    verse: string,
    reference: string
  ): Promise<ServiceResult<PlainMeaningData>> {
    // Pre-validation of inputs
    if (!verse || verse.trim().length === 0) {
      return {
        success: false,
        error: "Verse text is required to generate plain meaning",
        errorCode: "EMPTY_VERSE_TEXT",
      };
    }

    if (!reference || reference.trim().length === 0) {
      return {
        success: false,
        error: "Reference is required to generate plain meaning",
        errorCode: "EMPTY_REFERENCE",
      };
    }

    return retryService(
      async () => {
        try {
          const result = await verseInsightsService.getPlainMeaning({ verse, reference });
          
          // Validate response structure
          const validation = validateApiResponse(result, isPlainMeaningResponse);
          if (!validation.success) {
            return {
              success: false,
              error: validation.error,
              errorCode: validation.errorCode,
            };
          }

          // Ensure we have a trusted reference value (use the input reference we validated)
          // This prevents the API from omitting or changing the reference field
          return {
            success: true,
            data: {
              plainMeaning: result.plainMeaning,
              reference: reference, // Use the validated input reference
            },
          };
        } catch (error) {
          console.error("[PlainMeaningService] Generate plain meaning error:", error);
          
          const errorMessage = error instanceof Error 
            ? error.message 
            : "Failed to simplify verse. Please try again.";
          
          return {
            success: false,
            error: errorMessage,
            errorCode: "GENERATE_PLAIN_MEANING_ERROR",
          };
        }
      },
      {
        maxRetries: 2,
        retryDelay: 1000,
      }
    );
  }
}

export const plainMeaningService = new PlainMeaningService();
