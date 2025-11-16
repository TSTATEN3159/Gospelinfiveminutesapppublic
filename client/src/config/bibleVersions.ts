export type BibleVersionCode =
  | "KJV"
  | "BBE"
  | "WEB"
  | "ASV";

export interface BibleVersionDef {
  code: BibleVersionCode;
  label: string;
}

export const BIBLE_VERSIONS: BibleVersionDef[] = [
  { code: "KJV", label: "KJV – King James Version" },
  { code: "BBE", label: "BBE – Bible in Basic English" },
  { code: "WEB", label: "WEB – World English Bible" },
  { code: "ASV", label: "ASV – American Standard Version" }
];

const STORAGE_KEY_VERSION = "preferredBibleVersion";

export function getInitialBibleVersion(): BibleVersionCode {
  if (typeof window === "undefined") return "KJV";
  const stored = window.localStorage.getItem(STORAGE_KEY_VERSION) as BibleVersionCode | null;
  if (stored && BIBLE_VERSIONS.some(v => v.code === stored)) {
    return stored;
  }
  return "KJV";
}

export function setPreferredBibleVersion(version: BibleVersionCode) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY_VERSION, version);
}
