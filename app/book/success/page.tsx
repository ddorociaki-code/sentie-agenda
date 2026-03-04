'use client';

import { addMinutes, format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Professional, Service } from '@/lib/types';

export default function SuccessPage() {
  const search = useSearchParams();
  const serviceId = search.get('serviceId') ?? '';
  const professionalId = search.get('professionalId') ?? '';
  const start = search.get('start') ?? '';
  const fullName = search.get('fullName') ?? '';
  const appointmentId = search.get('appointmentId') ?? '';
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  useEffect(() => {
    fetch('/api/services').then(async (r) => setServices(await r.json()));
    fetch('/api/professionals').then(async (r) => setProfessionals(await r.json()));
  }, []);

  const service = services.find((item) => item.id === serviceId);
  const professional = professionals.find((item) => item.id === professionalId);

  const googleCalendarLink = useMemo(() => {
    if (!service || !start) return '#';
    const end = addMinutes(parseISO(start), service.duration);
    const text = encodeURIComponent(`Sentiê Agenda - ${service.name}`);
    const details = encodeURIComponent(`${fullName} | Profissional: ${professional?.name ?? ''}`);
    const dates = `${format(parseISO(start), "yyyyMMdd'T'HHmmss")}/${format(end, "yyyyMMdd'T'HHmmss")}`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&dates=${dates}`;
  }, [service, start, fullName, professional]);

  const whatsappSalon = process.env.NEXT_PUBLIC_SALON_WHATSAPP ?? '5511999999999';
  const whatsappLink = `https://wa.me/${whatsappSalon}?text=${encodeURIComponent(`Novo agendamento (${appointmentId}): ${fullName} - ${service?.name ?? ''} com ${professional?.name ?? ''} em ${start}`)}`;

  return (
    <section className="space-y-4 rounded-2xl bg-white p-4 text-center shadow">
      <h2 className="text-xl font-bold text-brand-700">Agendamento confirmado! 💅</h2>
      <p className="text-sm text-slate-600">ID: {appointmentId}</p>
      <a href={googleCalendarLink} target="_blank" className="block w-full bg-brand-500 p-3 font-semibold text-white">
        Adicionar ao Google Agenda
      </a>
      <a href={whatsappLink} target="_blank" className="block w-full border p-3 font-semibold">
        Enviar no WhatsApp do salão
      </a>
      <Link href="/book/service" className="block text-sm text-slate-600">Novo agendamento</Link>
    </section>
  );
}
