import { db } from '@/lib/db';

export async function GET() {
  const professionals = await db.getProfessionals();
  return Response.json(professionals);
}
