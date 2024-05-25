import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../../../config/db.config';
import {UserRepository} from "../../domain/repositories/user.repository";
import {UserDBRepository} from "./repositories/user.repository";
import {TodoRepository} from "../../domain/repositories/todo.repository";
import {TodoDBRepository} from "./repositories/todo.repository";
import {UserEntity} from "./entities/user.entity";
import {TodoEntity} from "./entities/todo.entity";

const repositories = [
    {
        provide: UserRepository,
        useClass: UserDBRepository
    },
    {
        provide: TodoRepository,
        useClass: TodoDBRepository
    }
];

@Module({
    imports: [
        TypeOrmModule.forRoot(dbConfig),
        TypeOrmModule.forFeature([
            UserEntity,
            TodoEntity
        ]),
    ],
    providers: [...repositories],
    exports: [TypeOrmModule, ...repositories],
})
export class DatabaseModule {}
