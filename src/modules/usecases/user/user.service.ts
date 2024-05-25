import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {UserRepository} from "../../domain/repositories/user.repository";
import {User} from "../../domain/models/user.model";
import {UserUseCase} from "./user.usecase";
import {PasswordUtil} from "../../../shared/utils/password.util";

@Injectable()
export class UserService implements UserUseCase {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(userToCreate: User): Promise<User> {
    const userExist = await this.userRepository.findByUsername(userToCreate.username);

    if (userExist) throw new BadRequestException('user already exit');

    const hashedPassword = await PasswordUtil.hashPassword(userToCreate.password);

    const { password, ...cleanUser } = await this.userRepository.save({
      ...userToCreate,
      password: hashedPassword,
    });

    return cleanUser as User;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'user not found',
      });
    }
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'user not found',
      });
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async remove(id: string): Promise<void> {
      await this.userRepository.delete(id);
  }
}
