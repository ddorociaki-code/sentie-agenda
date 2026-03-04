import { addMinutes, formatISO, parseISO } from 'date-fns';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { serviceId, professionalId, start, fullName, whatsapp } = body as {
    serviceId: string;
    professionalId: string;
    start: string;
    fullName: string;
    whatsapp: string;
  };

  if (!serviceId || !professionalId || !start || !fullName || !whatsapp) {
    return Response.json({ error: 'Dados incompletos para agendamento.' }, { status: 400 });
  }

  const [services, appointments, blocks] = await Promise.all([
    db.getServices(),
    db.getAppointments(),
    db.getBlocks()
  ]);
  const service = services.find((item) => item.id === serviceId);

  if (!service) {
    return Response.json({ error: 'Serviço inválido.' }, { status: 404 });
  }

  const startDate = parseISO(start);
  const endDate = addMinutes(startDate, service.duration);

  const conflict = appointments
    .filter((item) => item.professionalId === professionalId && item.status === 'active')
    .some((item) => startDate < parseISO(item.end) && parseISO(item.start) < endDate);

  const blocked = blocks
    .filter((item) => item.professionalId === professionalId)
    .some((item) => startDate < parseISO(item.end) && parseISO(item.start) < endDate);

  if (conflict || blocked) {
    return Response.json({ error: 'Horário indisponível. Escolha outro.' }, { status: 409 });
  }

  const appointment = {
    id: crypto.randomUUID(),
    serviceId,
    professionalId,
    start: formatISO(startDate),
    end: formatISO(endDate),
    fullName,
    whatsapp,
    status: 'active' as const,
    createdAt: new Date().toISOString()
  };

  await db.saveAppointments([...appointments, appointment]);

  return Response.json(appointment, { status: 201 });
}
