// client/src/services/instantApplicationService.ts

import { verseInsightsService, VersePassageResponse, InstantApplicationResponse } from "./verseInsightsService";
import { retryService, validateApiResponse, ServiceResult } from "@/lib/featureService";

export interface VerseData {
  text: string;
  reference: string;
}

export interface ApplicationData {
  application: string;
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

function isInstantApplicationResponse(data: any): data is InstantApplicationResponse {
  return (
    data &&
    typeof data === 'object' &&
    typeof data.application === 'string' &&
    data.application.trim().length > 0
  );
}

class InstantApplicationService {
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
          console.error("[InstantApplicationService] Fetch verse error:", error);
          
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
   * Generates practical application from a Bible verse with retry and validation
   */
  async generateApplication(verse: string, reference: string): Promise<ServiceResult<ApplicationData>> {
    // Pre-validate inputs
    if (!verse || verse.trim().length === 0) {
      return {
        success: false,
        error: "Verse text is required to generate application",
        errorCode: "INVALID_INPUT",
      };
    }

    if (!reference || reference.trim().length === 0) {
      return {
        success: false,
        error: "Reference is required to generate application",
        errorCode: "INVALID_INPUT",
      };
    }

    return retryService(
      async () => {
        try {
          const result = await verseInsightsService.getInstantApplication({ verse, reference });
          
          // Validate response structure
          const validation = validateApiResponse(result, isInstantApplicationResponse);
          if (!validation.success) {
            return {
              success: false,
              error: validation.error,
              errorCode: validation.errorCode,
            };
          }

          // Check for empty application
          if (!result.application || result.application.trim().length === 0) {
            return {
              success: false,
              error: "No application generated for this verse",
              errorCode: "EMPTY_APPLICATION",
            };
          }

          return {
            success: true,
            data: {
              application: result.application,
              // Use trusted reference from input, not API
              reference: reference,
            },
          };
        } catch (error) {
          console.error("[InstantApplicationService] Generate application error:", error);
          
          const errorMessage = error instanceof Error 
            ? error.message 
            : "Failed to generate application. Please try again.";
          
          return {
            success: false,
            error: errorMessage,
            errorCode: "GENERATE_APPLICATION_ERROR",
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

export const instantApplicationService = new InstantApplicationService();
