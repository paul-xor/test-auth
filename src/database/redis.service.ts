import { createClient, RedisClientType } from 'redis';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class RedisService {
  client: RedisClientType<any>;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.client = createClient({ url: process.env.REDIS_URL });
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.logger.log('[RedisService] Successfully connect to db');
      console.log(await this.client.GET('message')); // <= FIXME:
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error('[RedisService] Connection Error: ' + e.message);
      }
    }
  }

  async disconnect(): Promise<void> {
    await this.client.disconnect();
  }
}
