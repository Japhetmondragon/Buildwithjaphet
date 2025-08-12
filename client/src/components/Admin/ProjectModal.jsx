import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import ProjectForm from "./ProjectForm";
import { projectsAPI } from "../../services/api";

export default function ProjectModal({
  open,
  mode = "create",      // "create" | "edit"
  projectId,            // required for edit
  onClose,
  onSaved,              // callback(newOrUpdatedDoc)
  onDeleted,            // callback(id)
}) {
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load project when editing
  useEffect(() => {
    if (!open) return;
    setError("");
    if (mode === "edit" && projectId) {
      setLoading(true);
      projectsAPI
        .getById(projectId)
        .then(({ data }) => setInitialData(data || {}))
        .catch((err) =>
          setError(
            err?.response?.data?.message || err?.message || "Failed to load project"
          )
        )
        .finally(() => setLoading(false));
    } else {
      setInitialData({});
    }
  }, [open, mode, projectId]);

  const handleSubmit = async (payload) => {
    try {
      setSaving(true);
      setError("");
      let data;
      if (mode === "edit" && projectId) {
        ({ data } = await projectsAPI.update(projectId, payload));
      } else {
        ({ data } = await projectsAPI.create(payload));
      }
      onSaved?.(data);
      onClose?.();
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to save project"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setSaving(true);
      setError("");
      await projectsAPI.remove(projectId);
      onDeleted?.(projectId);
      onClose?.();
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to delete project"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "edit" ? "Edit Project" : "Add New Project"}
      size="xl"
    >
      {error ? (
        <div className="mb-4 border-2 border-red-500 text-red-700 p-3">{error}</div>
      ) : null}

      {loading ? (
        <div className="py-10 text-center">Loading...</div>
      ) : (
        <ProjectForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onDelete={mode === "edit" ? handleDelete : undefined}
          submitting={saving}
        />
      )}
    </Modal>
  );
}
