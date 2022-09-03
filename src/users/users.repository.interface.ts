import { User } from './user.entity';

export interface IUsersRepository {
  checkUnique: (name: string) => Promise<boolean>;
  create: (user: User) => Promise<any>;
  find: (email: string) => Promise<any | null>;
}
