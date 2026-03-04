'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Service } from '@/lib/types';

export default function ServicePage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch('/api/services').then(async (r) => setServices(await r.json()));
  }, []);

  return (
    <section className="space-y-4 rounded-2xl bg-white p-4 shadow">
      <h1 className="text-2xl font-bold text-brand-700">Sentiê Agenda</h1>
      <h2 className="font-semibold">1) Escolha o serviço</h2>
      <div className="space-y-2">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/book/professional?serviceId=${service.id}`}
            className="block rounded-xl border border-slate-200 p-3"
          >
            <p className="font-medium">{service.name}</p>
            <p className="text-sm text-slate-600">{service.duration} min • R$ {service.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
