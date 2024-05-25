import { Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UserRepository} from "../../domain/repositories/user.repository";
import {PasswordUtil} from "../../../shared/utils/password.util";
@Injectable()
export class AuthService {
  constructor(
      @Inject(UserRepository)
      private readonly userRepository: UserRepository,
      private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);

    if (user && await PasswordUtil.comparePassword(password, user.password)) {
      const { id, username } = user;
      const accessToken = this.jwtService.sign({ id, username });
      const { password, ...cleanUser } = user;

      return {
        accessToken,
        user: cleanUser
      };
    }
    throw new UnauthorizedException();
  }
}
