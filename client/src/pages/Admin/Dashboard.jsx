import React, { useEffect, useState } from 'react';
import Container from '../../components/UI/Container';
import Section from '../../components/UI/Section';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../hooks/useProjects';
import ProjectModal from '../../components/Admin/ProjectModal';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { projects } = useProjects();

  // keep local copy so UI updates instantly after save/delete
  const [items, setItems] = useState([]);
  useEffect(() => setItems(projects || []), [projects]);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // "create" | "edit"
  const [activeId, setActiveId] = useState(null);

  const openCreate = () => {
    setActiveId(null);
    setModalMode('create');
    setModalOpen(true);
  };
  const openEdit = (id) => {
    setActiveId(id);
    setModalMode('edit');
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const onSaved = (doc) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p._id === doc._id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = doc;
        return next;
      }
      return [doc, ...prev];
    });
  };

  const onDeleted = (id) => {
    setItems((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <Section>
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display text-3xl uppercase">Admin Dashboard</h1>
          <Button onClick={logout} variant="ghost">Logout</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-neutral-100 border-2 border-brand-black">
            <div className="text-3xl font-display mb-2">{items.length}</div>
            <div className="text-neutral-600">Total Projects</div>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <Button onClick={openCreate}>Add New Project</Button>
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
              {items.map((project) => (
                <tr key={project._id} className="border-b border-neutral-200">
                  <td className="p-4">{project.title}</td>
                  <td className="p-4">{project.slug}</td>
                  <td className="p-4">{project.featured ? '✓' : ''}</td>
                  <td className="p-4">
                    <Button size="sm" variant="ghost" onClick={() => openEdit(project._id)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-neutral-600" colSpan={4}>
                    No projects yet — click “Add New Project”.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Create/Edit modal */}
        <ProjectModal
          open={modalOpen}
          mode={modalMode}
          projectId={activeId}
          onClose={closeModal}
          onSaved={onSaved}
          onDeleted={onDeleted}
        />
      </Container>
    </Section>
  );
};

export default AdminDashboard;
