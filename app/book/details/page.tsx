'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function DetailsPage() {
  const router = useRouter();
  const search = useSearchParams();
  const serviceId = search.get('serviceId');
  const professionalId = search.get('professionalId');
  const start = search.get('start');
  const date = search.get('date');
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  async function confirm() {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceId, professionalId, start, fullName, whatsapp })
    });

    if (!response.ok) {
      alert('Horário indisponível.');
      return;
    }

    const item = await response.json();
    const params = new URLSearchParams({
      serviceId: serviceId ?? '',
      professionalId: professionalId ?? '',
      start: start ?? '',
      date: date ?? '',
      fullName,
      whatsapp,
      appointmentId: item.id
    });
    router.push(`/book/success?${params.toString()}`);
  }

  if (!serviceId || !professionalId || !start) {
    return <p className="rounded-xl bg-white p-4">Preencha as etapas anteriores.</p>;
  }

  return (
    <section className="space-y-4 rounded-2xl bg-white p-4 shadow">
      <h2 className="font-semibold">4) Seus dados</h2>
      <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nome completo" className="w-full border p-3" />
      <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp" className="w-full border p-3" />
      <button onClick={confirm} className="w-full bg-brand-500 p-3 font-semibold text-white" disabled={!fullName || !whatsapp}>
        Confirmar agendamento
      </button>
    </section>
  );
}
