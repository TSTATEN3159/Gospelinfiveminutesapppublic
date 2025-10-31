const BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export type Gender = "men" | "women";

export type Devotional = {
  day: number;
  scriptureRef: string;
  scriptureText: string;
  devotion: string;
  application: string;
};

function apiUrl(path: string) {
  // In production (iOS app), use the deployed backend URL
  // In development (Replit), use relative URLs (frontend & backend on same server)
  if (BASE) {
    return `${BASE}${path}`;
  }
  // Development: relative URL
  return path;
}

export async function fetchDevotional(gender: Gender, day: number): Promise<Devotional> {
  const res = await fetch(apiUrl(`/api/devotionals/365/${gender}/${day}`), {
    method: "GET",
    headers: { "Accept": "application/json" },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Devotional fetch failed (${res.status}): ${text}`);
  }
  return res.json();
}

export async function pingPlan(): Promise<{ ok: true }> {
  // Optional: touches the plan index so first call is "warm"
  const res = await fetch(apiUrl(`/api/devotionals/365`), { method: "GET" });
  if (!res.ok) throw new Error(`Devotional plan ping failed: ${res.status}`);
  return { ok: true };
}
