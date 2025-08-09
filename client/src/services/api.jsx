import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
});

export const authAPI = {
  login: (email, password) => API.post('/auth/login', { email, password }),
  me: () => API.get('/auth/me'),
  logout: () => API.post('/auth/logout'),
};


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
