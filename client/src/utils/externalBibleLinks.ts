export type ExternalTranslationCode =
  | "NIV"
  | "NLT"
  | "NKJV"
  | "NASB1995"
  | "MSG";

const BIBLEGATEWAY_CODES: Record<ExternalTranslationCode, string> = {
  NIV: "NIV",
  NLT: "NLT",
  NKJV: "NKJV",
  NASB1995: "NASB1995",
  MSG: "MSG",
};

export function buildBibleGatewayUrl(
  reference: string,
  translation: ExternalTranslationCode
): string {
  const versionCode = BIBLEGATEWAY_CODES[translation];
  const encodedRef = encodeURIComponent(reference.trim());
  return `https://www.biblegateway.com/passage/?search=${encodedRef}&version=${versionCode}`;
}
