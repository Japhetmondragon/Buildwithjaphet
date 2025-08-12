import React, { useMemo, useState, useEffect } from "react";
import Button from "../UI/Button";
import { uploadsAPI } from "../../services/api";

const toList = (val) =>
  Array.isArray(val) ? val : (val || "").split(",").map(s => s.trim()).filter(Boolean);

const toMultiline = (val) =>
  Array.isArray(val) ? val.join("\n") : (val || "");

const numOrUndef = (v) => {
  if (v === null || v === undefined) return undefined;
  const s = String(v).trim();
  if (s === "") return undefined;
  const n = Number(s);
  return Number.isNaN(n) ? undefined : n;
};

export default function ProjectForm({
  initialData = {},
  onSubmit,
  onDelete,          // optional, only used in Edit
  submitting = false
}) {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    tags: "",
    heroImage: "",
    galleryMultiline: "",
    role: "",
    stack: "",
    problem: "",
    approach: "",
    results: "",
    metrics: {
      conversionLift: "",
      lcpImprovementMs: "",
      ctaCTR: "",
      leadRate: ""
    },
    links: {
      repo: "",
      live: ""
    },
    featured: false,
    order: 0
  });

  // upload state
  const [heroProgress, setHeroProgress] = useState(0);
  const [galleryProgress, setGalleryProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  // hydrate when editing
  useEffect(() => {
    if (!initialData || Object.keys(initialData).length === 0) return;
    setForm({
      title: initialData.title || "",
      slug: initialData.slug || "",
      summary: initialData.summary || "",
      tags: (initialData.tags || []).join(", "),
      heroImage: initialData.heroImage || "",
      galleryMultiline: toMultiline(initialData.gallery || []),
      role: initialData.role || "",
      stack: (initialData.stack || []).join(", "),
      problem: initialData.problem || "",
      approach: initialData.approach || "",
      results: initialData.results || "",
      metrics: {
        conversionLift: initialData.metrics?.conversionLift ?? "",
        lcpImprovementMs: initialData.metrics?.lcpImprovementMs ?? "",
        ctaCTR: initialData.metrics?.ctaCTR ?? "",
        leadRate: initialData.metrics?.leadRate ?? ""
      },
      links: {
        repo: initialData.links?.repo || "",
        live: initialData.links?.live || ""
      },
      featured: Boolean(initialData.featured),
      order: initialData.order ?? 0
    });
  }, [initialData]);

  const handle = (field) => (e) => {
    const value = e?.target?.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleMetric = (field) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, metrics: { ...f.metrics, [field]: value } }));
  };

  const handleLink = (field) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, links: { ...f.links, [field]: value } }));
  };

  const payload = useMemo(() => {
    return {
      title: form.title,
      slug: form.slug,
      summary: form.summary,
      tags: toList(form.tags),
      heroImage: form.heroImage,
      gallery: form.galleryMultiline
        .split("\n")
        .map(s => s.trim())
        .filter(Boolean),
      role: form.role,
      stack: toList(form.stack),
      problem: form.problem,
      approach: form.approach,
      results: form.results,
      metrics: {
        conversionLift: numOrUndef(form.metrics.conversionLift),
        lcpImprovementMs: numOrUndef(form.metrics.lcpImprovementMs),
        ctaCTR: numOrUndef(form.metrics.ctaCTR),
        leadRate: numOrUndef(form.metrics.leadRate),
      },
      links: {
        repo: form.links.repo || "",
        live: form.links.live || "",
      },
      featured: !!form.featured,
      order: numOrUndef(form.order) ?? 0,
    };
  }, [form]);

  const submit = (e) => {
    e.preventDefault();
    if (!form.title?.trim()) {
      alert("Title is required");
      return;
    }
    onSubmit?.(payload);
  };

  // --- Upload helpers ---
  const validateImage = (file) => {
    setUploadError("");
    if (!file) return false;
    if (!file.type.startsWith("image/")) {
      setUploadError("Only image files are allowed.");
      return false;
    }
    const maxBytes = 8 * 1024 * 1024; // 8MB (matches server)
    if (file.size > maxBytes) {
      setUploadError("File too large. Max size is 8MB.");
      return false;
    }
    return true;
  };

  const onUploadHero = async (e) => {
    const file = e.target.files?.[0];
    if (!validateImage(file)) return;
    try {
      setHeroProgress(1);
      const { data } = await uploadsAPI.uploadImage(file, setHeroProgress);
      setForm((f) => ({ ...f, heroImage: data.url }));
    } catch (err) {
      setUploadError(err?.response?.data?.message || err?.message || "Upload failed");
    } finally {
      setHeroProgress(0);
      e.target.value = "";
    }
  };

  const onUploadGallery = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    try {
      setGalleryProgress(1);
      let appended = "";
      for (const file of files) {
        if (!validateImage(file)) continue;
        const { data } = await uploadsAPI.uploadImage(file, (p) => setGalleryProgress(p));
        appended += (appended ? "\n" : "") + data.url;
      }
      setForm((f) => ({
        ...f,
        galleryMultiline: [f.galleryMultiline, appended].filter(Boolean).join("\n"),
      }));
    } catch (err) {
      setUploadError(err?.response?.data?.message || err?.message || "Upload failed");
    } finally {
      setGalleryProgress(0);
      e.target.value = "";
    }
  };

  const removeGalleryItem = (url) => {
    setForm((f) => ({
      ...f,
      galleryMultiline: f.galleryMultiline
        .split("\n")
        .map(s => s.trim())
        .filter(Boolean)
        .filter((u) => u !== url)
        .join("\n"),
    }));
  };

  const galleryList = useMemo(
    () =>
      form.galleryMultiline
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    [form.galleryMultiline]
  );

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Basic */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Title *</label>
          <input
            className="w-full border-2 border-brand-black p-2"
            value={form.title}
            onChange={handle("title")}
            placeholder="E-Commerce Platform Redesign"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Slug</label>
          <input
            className="w-full border-2 border-brand-black p-2"
            value={form.slug}
            onChange={handle("slug")}
            placeholder="ecommerce-platform-redesign"
          />
          <p className="text-sm text-neutral-600 mt-1">
            Leave blank to auto-generate from the title.
          </p>
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-1">Summary</label>
        <textarea
          className="w-full border-2 border-brand-black p-2 min-h-[80px]"
          value={form.summary}
          onChange={handle("summary")}
          placeholder="Modernized UX and improved Core Web Vitals to boost checkout conversion."
        />
      </div>

      {/* Taxonomy */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Tags (comma-separated)</label>
          <input
            className="w-full border-2 border-brand-black p-2"
            value={form.tags}
            onChange={handle("tags")}
            placeholder="react, seo, performance"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Stack (comma-separated)</label>
          <input
            className="w-full border-2 border-brand-black p-2"
            value={form.stack}
            onChange={handle("stack")}
            placeholder="React, Node.js, TailwindCSS"
          />
        </div>
      </div>

      {/* Media */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Hero */}
        <div>
          <label className="block font-semibold mb-1">Hero Image URL</label>
          <div className="flex gap-2">
            <input
              className="w-full border-2 border-brand-black p-2"
              value={form.heroImage}
              onChange={handle("heroImage")}
              placeholder="https://..."
            />
            <label className="inline-flex">
              <input
                type="file"
                accept="image/*"
                onChange={onUploadHero}
                className="hidden"
              />
              <span className="px-3 py-2 border-2 border-brand-black cursor-pointer hover:bg-neutral-100">
                Upload
              </span>
            </label>
          </div>
          {heroProgress > 0 && (
            <div className="text-sm text-neutral-600 mt-1">Uploading… {heroProgress}%</div>
          )}
          {form.heroImage && (
            <div className="mt-3">
              <img
                src={form.heroImage}
                alt="Hero preview"
                className="w-full aspect-video object-cover border-2 border-brand-black"
              />
            </div>
          )}
        </div>

        {/* Gallery */}
        <div>
          <label className="block font-semibold mb-1">Gallery (one URL per line)</label>
          <div className="flex gap-2">
            <textarea
              className="w-full border-2 border-brand-black p-2 min-h-[80px]"
              value={form.galleryMultiline}
              onChange={handle("galleryMultiline")}
              placeholder={"https://...\nhttps://..."}
            />
            <label className="inline-flex">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={onUploadGallery}
                className="hidden"
              />
              <span className="px-3 py-2 border-2 border-brand-black cursor-pointer hover:bg-neutral-100">
                Upload
              </span>
            </label>
          </div>
          {galleryProgress > 0 && (
            <div className="text-sm text-neutral-600 mt-1">Uploading… {galleryProgress}%</div>
          )}

          {/* Gallery preview list */}
          {galleryList.length > 0 && (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
              {galleryList.map((url) => (
                <div key={url} className="border-2 border-brand-black p-2">
                  <div className="aspect-video overflow-hidden">
                    <img src={url} alt="Gallery item" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs break-all pr-2">{url}</span>
                    <button
                      type="button"
                      className="text-xs px-2 py-1 border-2 border-brand-black hover:bg-brand-black hover:text-neutral-50"
                      onClick={() => removeGalleryItem(url)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Narrative */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block font-semibold mb-1">Problem</label>
          <textarea
            className="w-full border-2 border-brand-black p-2 min-h-[80px]"
            value={form.problem}
            onChange={handle("problem")}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Approach</label>
          <textarea
            className="w-full border-2 border-brand-black p-2 min-h-[80px]"
            value={form.approach}
            onChange={handle("approach")}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Results</label>
          <textarea
            className="w-full border-2 border-brand-black p-2 min-h-[80px]"
            value={form.results}
            onChange={handle("results")}
          />
        </div>
      </div>

      {/* Metrics */}
      <div>
        <div className="font-semibold mb-2">Metrics (numbers only)</div>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm mb-1">conversionLift (e.g. 0.22 for 22%)</label>
            <input
              className="w-full border-2 border-brand-black p-2"
              value={form.metrics.conversionLift}
              onChange={handleMetric("conversionLift")}
              placeholder="0.22"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">lcpImprovementMs</label>
            <input
              className="w-full border-2 border-brand-black p-2"
              value={form.metrics.lcpImprovementMs}
              onChange={handleMetric("lcpImprovementMs")}
              placeholder="900"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">ctaCTR</label>
            <input
              className="w-full border-2 border-brand-black p-2"
              value={form.metrics.ctaCTR}
              onChange={handleMetric("ctaCTR")}
              placeholder="0.18"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">leadRate</label>
            <input
              className="w-full border-2 border-brand-black p-2"
              value={form.metrics.leadRate}
              onChange={handleMetric("leadRate")}
              placeholder="0.12"
            />
          </div>
        </div>
      </div>

      {/* Links & flags */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block font-semibold mb-1">Repo URL</label>
          <input
            className="w-full border-2 border-brand-black p-2"
            value={form.links.repo}
            onChange={handleLink("repo")}
            placeholder="https://github.com/..."
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Live URL</label>
          <input
            className="w-full border-2 border-brand-black p-2"
            value={form.links.live}
            onChange={handleLink("live")}
            placeholder="https://..."
          />
        </div>
        <div className="flex items-end gap-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={handle("featured")}
            />
            <span className="font-semibold">Featured</span>
          </label>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Order</label>
            <input
              className="w-full border-2 border-brand-black p-2"
              value={form.order}
              onChange={handle("order")}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {uploadError ? (
        <div className="border-2 border-red-500 text-red-700 p-3">{uploadError}</div>
      ) : null}

      <div className="flex items-center justify-between pt-4">
        {onDelete ? (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              if (window.confirm("Delete this project? This cannot be undone.")) {
                onDelete();
              }
            }}
          >
            Delete
          </Button>
        ) : <span />}

        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
