'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Professional } from '@/lib/types';

export default function ProfessionalPage() {
  const search = useSearchParams();
  const serviceId = search.get('serviceId');
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  useEffect(() => {
    fetch('/api/professionals').then(async (r) => setProfessionals(await r.json()));
  }, []);

  if (!serviceId) {
    return <p className="rounded-xl bg-white p-4">Selecione um serviço primeiro.</p>;
  }

  return (
    <section className="space-y-4 rounded-2xl bg-white p-4 shadow">
      <h2 className="font-semibold">2) Escolha a profissional</h2>
      <div className="space-y-2">
        {professionals.map((professional) => (
          <Link
            key={professional.id}
            href={`/book/calendar?serviceId=${serviceId}&professionalId=${professional.id}`}
            className="block rounded-xl border border-slate-200 p-3"
          >
            {professional.name}
          </Link>
        ))}
      </div>
      <Link href="/book/service" className="block text-center text-sm text-slate-600">
        ← Voltar
      </Link>
    </section>
  );
}
