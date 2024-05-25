import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import {UserRepository} from "../../../domain/repositories/user.repository";
import {UserEntity} from "../entities/user.entity";
import {User} from "../../../domain/models/user.model";

@Injectable()
export class UserDBRepository implements UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find({
            relations: ['todos'],
            select: ['id', 'username', 'name', 'createdAt', 'updatedAt'],
        });
    }

    async findById(id: string): Promise<User> {
        if (!id) {
            return null;
        }
        return this.userRepository.findOne({
            relations: ['todos'],
            select: ['id', 'username', 'name', 'createdAt', 'updatedAt'],
            where: { id },
        });
    }

    async findByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({
            relations: ['todos'],
            where: { username },
        });
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    async save(user: User): Promise<User> {
        return await this.userRepository.save(
            plainToClass(UserEntity, {
                id: uuid(),
                ...user,
            }),
        );
    }

}
