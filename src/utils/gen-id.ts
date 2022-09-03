import { randomBytes } from 'crypto';

export const genId = (): string => {
  return randomBytes(3).toString('hex');
};
