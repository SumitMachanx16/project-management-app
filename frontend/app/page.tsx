'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">🚀 Project Manager</h1>
      <button
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={() => router.push('/login')}
      >
        Login
      </button>
      <button
        className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
        onClick={() => router.push('/signup')}
      >
        Signup
      </button>
    </main>
  );
}
