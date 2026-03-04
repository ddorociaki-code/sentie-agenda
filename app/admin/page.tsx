'use client';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';

type DayItem = {
  id: string;
  fullName: string;
  whatsapp: string;
  start: string;
  serviceName: string;
  professionalName: string;
};

export default function AdminPage() {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [items, setItems] = useState<DayItem[]>([]);

  async function loadDay(currentDate = date) {
    const response = await fetch(`/api/admin/day?date=${currentDate}`);
    const json = await response.json();
    setItems(Array.isArray(json) ? json : []);
  }

  useEffect(() => {
    loadDay();
  }, []);

  return (
    <section className="space-y-4 rounded-2xl bg-white p-4 shadow">
      <h1 className="text-2xl font-bold text-brand-700">Agenda do dia</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => {
          const next = e.target.value;
          setDate(next);
          loadDay(next);
        }}
        className="w-full border p-3"
      />
      <div className="space-y-2">
        {items.length === 0 && <p className="text-sm text-slate-500">Sem agendamentos nesta data.</p>}
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border p-3 text-sm">
            <p>
              <strong>{new Date(item.start).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</strong>{' '}
              - {item.serviceName} com {item.professionalName}
            </p>
            <p>{item.fullName}</p>
            <p>{item.whatsapp}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
