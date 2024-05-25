import {
  Controller,
  Body,
  Post,
  UseGuards, Inject,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import {AuthUseCase} from "../../../usecases/auth/auth.usecase";
import {Public} from "../../../../shared/decorators/access.decorator";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
      @Inject(AuthUseCase)
        private readonly authService: AuthUseCase,
  ) {}

  @Public()
  @Post('login')
  login(@Body() user : LoginDto) {
    return this.authService.login(user.username, user.password);
  }

}
