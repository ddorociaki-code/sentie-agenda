import { isAdminAuthenticated } from '@/lib/admin-auth';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return Response.json({ error: 'Não autorizado.' }, { status: 401 });
  }
  const { appointmentId } = (await request.json()) as { appointmentId: string };
  if (!appointmentId) {
    return Response.json({ error: 'appointmentId obrigatório.' }, { status: 400 });
  }

  const appointments = await db.getAppointments();
  const updated = appointments.map((item) =>
    item.id === appointmentId ? { ...item, status: 'cancelled' as const } : item
  );

  await db.saveAppointments(updated);

  return Response.json({ ok: true });
}
