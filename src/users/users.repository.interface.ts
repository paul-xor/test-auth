import { User } from './user.entity';

export interface IUsersRepository {
  create: (user: User) => Promise<any>;
  find: (email: string) => Promise<any | null>;
}
