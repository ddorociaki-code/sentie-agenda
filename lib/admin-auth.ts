import { cookies } from 'next/headers';

export function isAdminAuthenticated() {
  const expected = process.env.ADMIN_PASSWORD;
  const token = cookies().get('admin_auth')?.value;
  return Boolean(expected) && token === expected;
}
