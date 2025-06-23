'use client';
import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function AuthForm({ type }: { type: 'login' | 'signup' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post(`/auth/${type}`, { email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert('Auth failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
      <input
        type="email"
        placeholder="Email"
        className="p-2 rounded bg-gray-800"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 rounded bg-gray-800"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-purple-500 py-2 rounded hover:bg-purple-600 transition"
      >
        {type === 'login' ? 'Login' : 'Signup'}
      </button>
    </form>
  );
}
