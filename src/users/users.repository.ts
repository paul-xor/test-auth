import { inject, injectable } from 'inversify';
import { RedisService } from '../database/redis.service';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';
import { genId } from '../utils/gen-id';
import { usersKey, userNameUniqueKey, userNamesKey } from '../utils/keys';

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
    await this.redisService.client.sAdd(userNameUniqueKey(), name);
    await this.redisService.client.zAdd(userNamesKey(), {
      value: name,
      score: parseInt(id, 16),
    });
    return id;
  }

  async checkUnique(name: string): Promise<boolean> {
    return await this.redisService.client.sIsMember(userNameUniqueKey(), name);
  }

  async find(username: string): Promise<any | null> {
    const decimalId = await this.redisService.client.zScore(userNamesKey(), username);
    if (!decimalId) {
      throw new Error('User does not exist');
    }
    const id = decimalId.toString(16);
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
