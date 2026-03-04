import { db } from '@/lib/db';

export async function GET() {
  const services = await db.getServices();
  return Response.json(services);
}
