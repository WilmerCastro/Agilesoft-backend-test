import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {TodoUseCase} from "./todo.usecase";
import {TodoRepository} from "../../domain/repositories/todo.repository";
import {UserRepository} from "../../domain/repositories/user.repository";
import {Todo} from "../../domain/models/todo.model";
import {TodoStatusEnum} from "../../../shared/enums/todo-status.enum";
import {User} from "../../domain/models/user.model";

@Injectable()
export class TodosService implements TodoUseCase {
  constructor(
      @Inject(TodoRepository)
        private readonly todoRepository: TodoRepository,
  ) { }

  async create(userId: string, todo: Todo): Promise<Todo> {
      const { user, ...cleanedTodo } = await this.todoRepository.save({ user: userId, ...todo });
      return cleanedTodo as Todo;
  }

    async findAll(): Promise<Todo[]> {
        return await this.todoRepository.findAll();
    }

    async findByUserId(userId: string): Promise<Todo[]> {
        return await this.todoRepository.findByUserId(userId);
    }

    async findOne(id: string): Promise<Todo> {
        return await this.todoRepository.findById(id);
    }

    public async updateStatus(id: string, status: TodoStatusEnum, user: User): Promise<Todo> {
        const todo = await this.todoRepository.findByUserAndId(id, user);
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        todo.status = status;
        return await this.todoRepository.update(id, todo, user);
    }

    async delete(id: string, user: User): Promise<void> {
        return await this.todoRepository.delete(id, user);
    }
}
