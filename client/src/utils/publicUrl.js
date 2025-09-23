export const FALLBACK_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'>
       <rect width='100%' height='100%' fill='#E0E0E0'/>
       <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
             fill='#666' font-family='system-ui,sans-serif' font-size='24'>
         Image not available
       </text>
     </svg>`
  );

export function toPublicUrl(pathOrUrl) {
  if (!pathOrUrl) return FALLBACK_SVG;

  // Already absolute
  if (typeof pathOrUrl === "string" && /^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;

  // Handle objects like { absoluteUrl, url, path }
  if (pathOrUrl && typeof pathOrUrl === "object") {
    const candidate = pathOrUrl.absoluteUrl || pathOrUrl.url || pathOrUrl.path || "";
    return toPublicUrl(candidate);
  }

  const p = String(pathOrUrl);

  // 1) Prefer explicit ORIGIN (no /api here!)
  const ORIGIN = (import.meta.env.VITE_API_ORIGIN || "").replace(/\/$/, "");
  if (ORIGIN) {
    // p is usually "/api/uploads/<id>" – just stick it after the origin
    const suff = p.startsWith("/") ? p : "/" + p;
    return ORIGIN + suff;
  }

  // 2) Otherwise, use API_URL (may be absolute or '/api')
  const API_URL = import.meta.env.VITE_API_URL || "";
  const isAbs = /^https?:\/\//i.test(API_URL);

  if (isAbs) {
    // If API_URL already has a path (e.g. ends with /api), don't double it.
    const u = new URL(API_URL);
    const basePath = u.pathname.replace(/\/+$/, ""); // e.g. "/api"
    const pPath = p.startsWith("/") ? p : "/" + p;   // e.g. "/api/uploads/.."
    // If p already starts with basePath, use p as-is; else prefix basePath.
    const finalPath = basePath && !pPath.startsWith(basePath + "/")
      ? basePath + pPath
      : pPath;
    u.pathname = finalPath;
    return u.toString();
  }

  if (API_URL) {
    // Relative base (e.g. "/api")
    const base = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;
    // If p already starts with '/api/', return p; else join.
    if (p.startsWith(base + "/")) return p;
    const suff = p.startsWith("/") ? p : "/" + p;
    return base + suff; // "/api" + "/uploads/.." -> "/api/uploads/.."
  }

  // Same-origin fallback
  return p;
}
