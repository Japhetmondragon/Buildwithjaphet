import React, { useEffect } from "react";

export default function Modal({
  open = false,
  onClose,
  title = "",
  children,
  size = "lg", // "md" | "lg" | "xl"
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const maxW =
    size === "md" ? "max-w-2xl" : size === "xl" ? "max-w-5xl" : "max-w-3xl";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start md:items-center justify-center"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Panel */}
      <div
        className={
          "relative w-full mx-3 md:mx-6 bg-white text-black rounded-lg shadow-xl " +
          "border-2 border-brand-black " +
          maxW
        }
      >
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-brand-black">
          <h2 id="modal-title" className="text-lg md:text-xl font-bold tracking-tight">
            {title}
          </h2>
          <button
            aria-label="Close"
            className="px-2 py-1 border-2 border-brand-black hover:bg-brand-black hover:text-neutral-50 transition"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="p-4 md:p-6 overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
}
