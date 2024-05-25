import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/infrastructure/database/database.module';
import {UserController} from "./modules/infrastructure/controllers/users/user.controller";
import {AuthController} from "./modules/infrastructure/controllers/auth/auth.controller";
import {TodosController} from "./modules/infrastructure/controllers/todos/todos.controller";
import {UserUseCase} from "./modules/usecases/user/user.usecase";
import {UserService} from "./modules/usecases/user/user.service";
import {AuthUseCase} from "./modules/usecases/auth/auth.usecase";
import {AuthService} from "./modules/usecases/auth/auth.service";
import {TodoUseCase} from "./modules/usecases/todos/todo.usecase";
import {TodosService} from "./modules/usecases/todos/todos.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        DatabaseModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '3600s' },
        }),
    ],
    controllers: [
        UserController,
        AuthController,
        TodosController
    ],
    providers: [
        {
            provide: UserUseCase,
            useClass: UserService
        },
        {
            provide: AuthUseCase,
            useClass: AuthService
        },
        {
            provide: TodoUseCase,
            useClass: TodosService
        }
    ],
})
export class AppModule {}
