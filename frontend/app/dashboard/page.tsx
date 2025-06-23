'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Project } from '@/types';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    api.get('/projects').then(res => setProjects(res.data)).catch(() => router.push('/login'));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/projects', { name, description });
    setName('');
    setDescription('');
    fetchProjects();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    }
  };

  const handleEdit = async (id: number) => {
    const newName = prompt('Enter new project name:');
    if (newName) {
      await api.put(`/projects/${id}`, { name: newName });
      fetchProjects();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleCreate} className="mb-6 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-gray-800 flex-1"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded bg-gray-800 flex-1"
        />
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition">
          Create
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-gray-800 rounded"
          >
            <div
              className="cursor-pointer"
              onClick={() => router.push(`/project/${p.id}`)}
            >
              <h2 className="text-xl">{p.name}</h2>
              <p className="text-sm text-gray-400">{p.description}</p>
            </div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(p.id)}
                className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
