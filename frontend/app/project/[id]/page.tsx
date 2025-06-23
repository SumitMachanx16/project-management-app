'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useParams } from 'next/navigation';
import { Task } from '@/types';
import { motion } from 'framer-motion';

export default function ProjectPage() {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [id]);

  const fetchTasks = () => {
    api.get(`/tasks/${id}`).then(res => setTasks(res.data));
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/tasks', { title, projectId: Number(id) });
    setTitle('');
    fetchTasks();
  };

  const toggleComplete = async (task: Task) => {
    await api.put(`/tasks/${task.id}`, { isCompleted: !task.isCompleted });
    fetchTasks();
  };

  const handleDelete = async (taskId: number) => {
    if (confirm('Delete this task?')) {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    }
  };

  const handleEdit = async (task: Task) => {
    const newTitle = prompt('Enter new task title:', task.title);
    if (newTitle) {
      await api.put(`/tasks/${task.id}`, { title: newTitle });
      fetchTasks();
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      <form onSubmit={handleCreateTask} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded bg-gray-800 flex-1"
          required
        />
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
          Add Task
        </button>
      </form>

      <ul className="space-y-2">
        {tasks.map((t) => (
          <motion.li
            key={t.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-2 rounded flex justify-between items-center ${t.isCompleted ? 'bg-green-700' : 'bg-gray-800'}`}
          >
            <span>{t.title}</span>
            <div className="flex gap-2">
              <button
                onClick={() => toggleComplete(t)}
                className={`px-2 py-1 rounded text-sm ${t.isCompleted ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}
              >
                {t.isCompleted ? 'Uncheck' : 'Check'}
              </button>
              <button
                onClick={() => handleEdit(t)}
                className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
    </main>
  );
}
