import { generateSlots } from '@/lib/availability';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const professionalId = searchParams.get('professionalId');
  const serviceId = searchParams.get('serviceId');
  const date = searchParams.get('date');

  if (!professionalId || !serviceId || !date) {
    return Response.json({ error: 'Parâmetros obrigatórios ausentes.' }, { status: 400 });
  }

  const [services, professionals, appointments, blocks] = await Promise.all([
    db.getServices(),
    db.getProfessionals(),
    db.getAppointments(),
    db.getBlocks()
  ]);

  const service = services.find((item) => item.id === serviceId);
  const professional = professionals.find((item) => item.id === professionalId);

  if (!service || !professional) {
    return Response.json({ error: 'Dados inválidos para gerar horários.' }, { status: 404 });
  }

  const slots = generateSlots({
    date,
    professional,
    duration: service.duration,
    appointments,
    blocks
  });

  return Response.json(slots);
}
