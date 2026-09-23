import path from 'node:path';

export const authStateFiles = {
  admin: path.resolve('.auth/admin.json'),
  customer: path.resolve('.auth/customer.json'),
} as const;
