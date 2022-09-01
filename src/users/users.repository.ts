import { inject, injectable } from 'inversify';
import { RedisService } from '../database/redis.service';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';
import { genId } from '../utils/gen-id';
import { usersKey } from '../utils/keys';

interface IUserDeserialize {
  id: string;
  email: string;
  password: string;
  name: string;
}

@injectable()
export class UsersRepository implements IUsersRepository {
  constructor(@inject(TYPES.RedisService) private redisService: RedisService) {}

  async create({ email, password, name }: User): Promise<string> {
    const id = genId();

    await this.redisService.client.hSet(usersKey(id), {
      email,
      password,
      name,
    });
    return id;
  }

  async find(id: string): Promise<any | null> {
    const user = await this.redisService.client.hGetAll(usersKey(id));
    return this.deserialize(id, user);
  }

  deserialize(id: string, user: { [key: string]: string }): IUserDeserialize {
    return {
      id: id,
      email: user.email,
      password: user.password,
      name: user.name,
    };
  }
}
