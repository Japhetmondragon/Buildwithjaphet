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

  // already absolute?
  if (typeof pathOrUrl === "string" && /^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;

  // object from API (absoluteUrl/url/path)
  if (typeof pathOrUrl === "object" && pathOrUrl !== null) {
    const candidate = pathOrUrl.absoluteUrl || pathOrUrl.url || pathOrUrl.path || "";
    return toPublicUrl(candidate);
  }

  const p = String(pathOrUrl);
  const base = import.meta.env.VITE_API_URL || "";
  const isAbsoluteBase = /^https?:\/\//i.test(base);

  if (isAbsoluteBase) {
    const cleaned = p.replace(/^\/+/, "");
    const ensured = base.endsWith("/") ? base : base + "/";
    return new URL(cleaned, ensured).toString();
  }

  // relative base (e.g. "/api")
  if (base) {
    const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
    const suffix = p.startsWith("/") ? p : "/" + p;
    return prefix + suffix;
  }

  // same-origin fallback
  return p;
}
