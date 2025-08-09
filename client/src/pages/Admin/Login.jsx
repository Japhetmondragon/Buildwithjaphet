import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/UI/Container';
import Section from '../../components/UI/Section';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(formData.email, formData.password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Section>
      <Container>
        <div className="max-w-md mx-auto">
          <h1 className="font-display text-3xl uppercase mb-8">Admin Login</h1>
          
          {error && (
            <div className="bg-red-50 border-2 border-red-200 p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-display uppercase text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border-2 border-brand-black focus:outline-none focus:border-brand-red"
                required
              />
            </div>
            
            <div>
              <label className="block font-display uppercase text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 border-2 border-brand-black focus:outline-none focus:border-brand-red"
                required
              />
            </div>
            
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </Container>
    </Section>
  );
};

export default AdminLogin;