import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/UI/Container';
import Section from '../../components/UI/Section';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../hooks/useProjects';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { projects } = useProjects();
  
  return (
    <Section>
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display text-3xl uppercase">Admin Dashboard</h1>
          <Button onClick={logout} variant="ghost">Logout</Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-neutral-100 border-2 border-brand-black">
            <div className="text-3xl font-display mb-2">{projects.length}</div>
            <div className="text-neutral-600">Total Projects</div>
          </div>
        </div>
        
        <div className="flex gap-4 mb-8">
          <Link to="/admin/projects/new">
            <Button>Add New Project</Button>
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-2 border-brand-black">
            <thead className="bg-brand-black text-neutral-50">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Slug</th>
                <th className="p-4 text-left">Featured</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id} className="border-b border-neutral-200">
                  <td className="p-4">{project.title}</td>
                  <td className="p-4">{project.slug}</td>
                  <td className="p-4">{project.featured ? '✓' : ''}</td>
                  <td className="p-4">
                    <Link to={`/admin/projects/${project._id}/edit`}>
                      <Button size="sm" variant="ghost">Edit</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
};

export default AdminDashboard;