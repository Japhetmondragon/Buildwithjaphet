// client/src/services/api.jsx
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true, // send auth cookie
});

export const authAPI = {
  login: (email, password) => API.post("/auth/login", { email, password }),
  me: () => API.get("/auth/me"),
  logout: () => API.post("/auth/logout"),
};

const _remove = (id) => API.delete(`/projects/${id}`);

export const projectsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return API.get(`/projects${params ? `?${params}` : ""}`);
  },
  getBySlug: (slug) => API.get(`/projects/${slug}`),
  getById: (id) => API.get(`/projects/id/${id}`),
  create: (data) => API.post("/projects", data),
  update: (id, data) => API.put(`/projects/${id}`, data),
  remove: _remove,     // used by ProjectModal
  delete: _remove,     // keep for compatibility
};

// ---- Uploads (GridFS)
export const uploadsAPI = {
  // returns { id, filename, path, url }
  uploadImage: (file, onProgress) => {
    const fd = new FormData();
    fd.append("file", file);
    return API.post("/uploads", fd, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (!onProgress || !e.total) return;
        onProgress(Math.round((e.loaded * 100) / e.total));
      },
    });
  },
  deleteById: (id) => API.delete(`/uploads/${id}`),
};


export default API;
