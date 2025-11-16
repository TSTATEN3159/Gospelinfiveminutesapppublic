/**
 * Plain Meaning Service Layer
 * 
 * Safely wraps the verse insights API calls with proper error handling
 * and standardized ServiceResult return types for the Plain Meaning feature.
 */

import { ServiceResult } from "@/lib/featureService";
import { verseInsightsService } from "./verseInsightsService";

export interface VerseData {
  text: string;
  reference: string;
}

export interface PlainMeaningData {
  plainMeaning: string;
  reference: string;
}

class PlainMeaningService {
  /**
   * Fetches a Bible verse passage by reference
   */
  async fetchVerse(reference: string): Promise<ServiceResult<VerseData>> {
    try {
      const result = await verseInsightsService.fetchPassage(reference);
      
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
  }

  /**
   * Generates plain meaning explanation for a verse
   */
  async generatePlainMeaning(
    verse: string,
    reference: string
  ): Promise<ServiceResult<PlainMeaningData>> {
    try {
      if (!verse || verse.trim().length === 0) {
        return {
          success: false,
          error: "Verse text is required to generate plain meaning",
          errorCode: "EMPTY_VERSE_TEXT",
        };
      }

      const result = await verseInsightsService.getPlainMeaning({ verse, reference });
      
      if (!result.plainMeaning || result.plainMeaning.trim().length === 0) {
        return {
          success: false,
          error: "Unable to generate plain meaning for this verse",
          errorCode: "EMPTY_PLAIN_MEANING",
        };
      }

      return {
        success: true,
        data: {
          plainMeaning: result.plainMeaning,
          reference,
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
  }
}

export const plainMeaningService = new PlainMeaningService();
