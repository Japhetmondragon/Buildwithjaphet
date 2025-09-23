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

// Accepts absolute URLs, relative "/api/...", or just an id path.
// Builds a correct public URL when API is on a different origin.
export function toPublicUrl(pathOrUrl) {
  if (!pathOrUrl) return FALLBACK_SVG;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl; // already absolute

  // Support objects like { absoluteUrl, url, path }
  if (typeof pathOrUrl === "object") {
    const candidate =
      pathOrUrl.absoluteUrl || pathOrUrl.url || pathOrUrl.path || "";
    return toPublicUrl(candidate);
  }

  const base = import.meta.env.VITE_API_URL || ""; // e.g. https://api.example.com/api
  if (base) {
    const cleaned = pathOrUrl.replace(/^\/+/, "");
    const ensured = base.endsWith("/") ? base : base + "/";
    return new URL(cleaned, ensured).toString();
  }
  return pathOrUrl; // same-origin fallback
}
