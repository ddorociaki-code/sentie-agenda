import { isAdminAuthenticated } from '@/lib/admin-auth';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return Response.json({ error: 'Não autorizado.' }, { status: 401 });
  }
  const { professionalId, start, end, reason } = (await request.json()) as {
    professionalId: string;
    start: string;
    end: string;
    reason?: string;
  };

  if (!professionalId || !start || !end) {
    return Response.json({ error: 'Dados incompletos para bloqueio.' }, { status: 400 });
  }

  const blocks = await db.getBlocks();
  const block = {
    id: crypto.randomUUID(),
    professionalId,
    start,
    end,
    reason,
    createdAt: new Date().toISOString()
  };

  await db.saveBlocks([...blocks, block]);

  return Response.json(block, { status: 201 });
}
