import { isAdminAuthenticated } from '@/lib/admin-auth';
import { isSameDay, parseISO } from 'date-fns';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  if (!isAdminAuthenticated()) {
    return Response.json({ error: 'Não autorizado.' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date) {
    return Response.json({ error: 'Data obrigatória.' }, { status: 400 });
  }

  const [appointments, services, professionals] = await Promise.all([
    db.getAppointments(),
    db.getServices(),
    db.getProfessionals()
  ]);

  const dayItems = appointments
    .filter((item) => item.status === 'active' && isSameDay(parseISO(item.start), parseISO(`${date}T00:00:00`)))
    .map((item) => ({
      ...item,
      serviceName: services.find((s) => s.id === item.serviceId)?.name ?? item.serviceId,
      professionalName: professionals.find((p) => p.id === item.professionalId)?.name ?? item.professionalId
    }))
    .sort((a, b) => a.start.localeCompare(b.start));

  return Response.json(dayItems);
}
