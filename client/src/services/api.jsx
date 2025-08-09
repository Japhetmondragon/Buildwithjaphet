import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
});

export const projectsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return API.get(`/projects${params ? `?${params}` : ""}`);
  },
  getBySlug: (slug) => API.get(`/projects/${slug}`),
  create: (data) => API.post("/projects", data),
  update: (id, data) => API.put(`/projects/${id}`, data),
  delete: (id) => API.delete(`/projects/${id}`),
};

export default API;
