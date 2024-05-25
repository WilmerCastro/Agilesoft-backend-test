import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import {TodoRepository} from "../../../domain/repositories/todo.repository";
import {TodoEntity} from "../entities/todo.entity";
import {Todo} from "../../../domain/models/todo.model";
import {User} from "../../../domain/models/user.model";

export class TodoDBRepository implements TodoRepository {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
    ) {}

    public findAll(): Promise<Todo[]> {
        return this.todoRepository.find({
        });
    }

    public findByUserId(userId: string): Promise<Todo[]> {
        return this.todoRepository.find({
            where: { user: { id: userId } },
        });
    }

    public findById(id: string): Promise<Todo> {
        return this.todoRepository.findOne({
            where: { id },
        });
    }

    public findByUserAndId(id: string, user: User): Promise<Todo> {
        return this.todoRepository.findOne({
            where: { id, user: { id: user.id } },
        });
    }

    public save(todo: Todo): Promise<Todo> {
        return this.todoRepository.save(
            plainToClass(TodoEntity, {
                id: uuid(),
                ...todo,
            })
        );
    }

    public async update(id: string, todo: Todo, user: User): Promise<Todo> {
        await this.todoRepository.update(
            {
                id,
                user: { id: user.id },
            },
            todo
        );
        return this.findById(id);
    }

    async delete(id: string, user: User): Promise<void> {
        await this.todoRepository.delete({
            id,
            user: { id: user.id },
        });
    }
}
