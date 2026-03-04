import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password: string };
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return Response.json({ error: 'ADMIN_PASSWORD não configurada.' }, { status: 500 });
  }

  if (password !== expected) {
    return Response.json({ error: 'Senha inválida.' }, { status: 401 });
  }

  cookies().set('admin_auth', expected, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  });

  return Response.json({ ok: true });
}
