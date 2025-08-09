import { useState, useEffect } from 'react';
import { projectsAPI } from '../services/api';

export const useProjects = (filters = {}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await projectsAPI.getAll(filters);
        setProjects(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [JSON.stringify(filters)]);
  
  return { projects, loading, error, refetch: () => window.location.reload() };
};

export const useProject = (slug) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!slug) return;
    
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await projectsAPI.getBySlug(slug);
        setProject(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [slug]);
  
  return { project, loading, error };
};