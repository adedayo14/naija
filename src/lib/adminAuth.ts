import { NextRequest } from 'next/server';

export function checkAdminSecret(req: NextRequest): boolean {
  const header = req.headers.get('x-admin-secret');
  const expected = process.env.ADMIN_SECRET;
  return Boolean(expected && header && header === expected);
}
