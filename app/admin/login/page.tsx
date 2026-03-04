'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');

  async function login() {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    if (!response.ok) {
      alert('Senha inválida');
      return;
    }

    router.push('/admin');
  }

  return (
    <section className="space-y-3 rounded-2xl bg-white p-4 shadow">
      <h1 className="text-xl font-bold text-brand-700">Admin • Login</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-3"
        placeholder="Senha"
      />
      <button onClick={login} className="w-full bg-brand-500 p-3 font-semibold text-white">
        Entrar
      </button>
    </section>
  );
}
