import {CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../constants/index';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Role } from '../enums/roles.enum';
import {UserService} from "../../modules/usecases/user/user.service";
import {UserUseCase} from "../../modules/usecases/user/user.usecase";

@Injectable()
export class AuthGuard  implements CanActivate {
  private logger = new Logger(AuthGuard.name);
  constructor(
    private readonly reflector: Reflector , 
    private readonly jwtService : JwtService ,
    @Inject(UserUseCase)
    private readonly userUseCase: UserUseCase,) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    this.logger.log('canActive fun in auth.guard 2');
    
    try{
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const token = this.extractToken(req);

    if (!token) {
      throw new UnauthorizedException('Authorization token not found');
    }
    
    const payload  = this.jwtService.verify(token , {secret : 'secret'}); 

    const {password , ...user} = await this.userUseCase.findByUsername(payload.username);

    if(!user){
     return false ;
    }

    req['user'] = {...user ,roles: [Role.USER]}; 
    return true ;
    
    }catch(err){ return false }
  } 

  private extractToken (req : Request) : string | undefined{
    const authHeader = req.headers?.authorization;
    if (!authHeader) {
      return undefined;
    }

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}


