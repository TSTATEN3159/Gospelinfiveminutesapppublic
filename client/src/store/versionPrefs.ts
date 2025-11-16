const VERSION_KEY = "preferredBibleVersion";

export function getVersion(): string {
  return localStorage.getItem(VERSION_KEY) || "KJV";
}

export function setVersion(version: string) {
  localStorage.setItem(VERSION_KEY, version);
}
