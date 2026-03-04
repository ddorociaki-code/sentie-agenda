'use client';

import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CalendarPage() {
  const search = useSearchParams();
  const serviceId = search.get('serviceId');
  const professionalId = search.get('professionalId');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [slots, setSlots] = useState<string[]>([]);

  async function loadSlots(selectedDate: string) {
    if (!serviceId || !professionalId) return;
    const response = await fetch(
      `/api/slots?serviceId=${serviceId}&professionalId=${professionalId}&date=${selectedDate}`
    );
    setSlots(await response.json());
  }

  useEffect(() => {
    loadSlots(date);
  }, [date]);

  if (!serviceId || !professionalId) {
    return <p className="rounded-xl bg-white p-4">Selecione serviço e profissional primeiro.</p>;
  }

  return (
    <section className="space-y-4 rounded-2xl bg-white p-4 shadow">
      <h2 className="font-semibold">3) Escolha data e horário</h2>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border p-3" />
      <div className="grid grid-cols-2 gap-2">
        {slots.map((slot) => (
          <Link
            key={slot}
            href={`/book/details?serviceId=${serviceId}&professionalId=${professionalId}&date=${date}&start=${encodeURIComponent(slot)}`}
            className="rounded-xl border border-slate-200 p-2 text-sm"
          >
            {format(parseISO(slot), 'dd/MM HH:mm')}
          </Link>
        ))}
      </div>
      {slots.length === 0 && <p className="text-sm text-slate-500">Sem horários disponíveis.</p>}
    </section>
  );
}
