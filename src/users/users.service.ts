import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
  ) {}
  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name);

    const salt = this.configService.get('SALT');
    await newUser.setPassword(password, Number(salt));
    const exist = await this.usersRepository.checkUnique(name);
    if (exist) {
      return null;
    }
    return this.usersRepository.create(newUser);
  }

  async validateUser({ name, password }: UserLoginDto): Promise<boolean> {
    const existedUser = await this.usersRepository.find(name);
    if (!existedUser) {
      return false;
    }
    const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
    return newUser.comparePassword(password);
  }
}
