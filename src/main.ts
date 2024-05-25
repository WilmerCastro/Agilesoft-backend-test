import {NestFactory, Reflector} from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {JwtService} from "@nestjs/jwt";
import {AuthGuard} from "./shared/guards/auth.guard";
import {RolesGuard} from "./shared/guards/roles.guard";
import {UserUseCase} from "./modules/usecases/user/user.usecase";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.API_PORT || 3000;
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle('Backend Test')
        .setDescription(
            `This is a test project for a backend. It is a simple project that has a user module, an auth module, and a todo module. The user module is responsible for creating users, the auth module is responsible for authenticating users, and the todo module is responsible for creating todos.
        `)
        .setVersion('1.0')
        .addServer('http://localhost:3000', 'Local environment')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);

    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({ transform: true, whitelist: true }),
    );
    const userService = app.get(UserUseCase);
    const jwtService = app.get(JwtService);
    const reflector = app.get(Reflector);
    app.useGlobalGuards(
        new AuthGuard(reflector, jwtService,  userService) ,
        new RolesGuard(reflector)
    )

    await app.listen(port);
}

bootstrap();
