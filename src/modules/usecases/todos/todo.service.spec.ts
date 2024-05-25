import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { NotFoundException } from '@nestjs/common';
import { Todo } from '../../domain/models/todo.model';
import { TodoStatusEnum } from '../../../shared/enums/todo-status.enum';
import { User } from '../../domain/models/user.model';

const mockTodoRepository = () => ({
    save: jest.fn(),
    findAll: jest.fn(),
    findByUserId: jest.fn(),
    findById: jest.fn(),
    findByUserAndId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
});

describe('TodosService', () => {
    let service: TodosService;
    let todoRepository;

    const user: User = {
        id: '1',
        name: 'Test User',
        username: 'testuser',
        password: 'testpassword',
        todos: [],
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TodosService,
                { provide: TodoRepository, useFactory: mockTodoRepository },
            ],
        }).compile();

        service = module.get<TodosService>(TodosService);
        todoRepository = module.get<TodoRepository>(TodoRepository);
    });

    describe('create', () => {
        it('should create a new todo successfully', async () => {
            const todo = {
                title: 'Test Todo',
                description: 'Test Description',
                status: TodoStatusEnum.RESOLVED,
            } as Todo;
            todoRepository.save.mockResolvedValue({ ...todo, user });

            const result = await service.create('1', todo);

            expect(result).toEqual({ ...todo });
            expect(todoRepository.save).toHaveBeenCalledWith({ user: '1', ...todo });
        });
    });

    describe('findAll', () => {
        it('should return an array of todos', async () => {
            const todos = [{
                title: 'Test Todo',
                description: 'Test Description',
                status: TodoStatusEnum.RESOLVED,
                user,
            }];
            todoRepository.findAll.mockResolvedValue(todos);

            const result = await service.findAll();

            expect(result).toEqual(todos);
            expect(todoRepository.findAll).toHaveBeenCalled();
        });
    });

    describe('findByUserId', () => {
        it('should return an array of todos for a user', async () => {
            const todos = [{
                title: 'Test Todo',
                description: 'Test Description',
                status: TodoStatusEnum.UNSOLVED,
                user,
            }];
            todoRepository.findByUserId.mockResolvedValue(todos);

            const result = await service.findByUserId('1');

            expect(result).toEqual(todos);
            expect(todoRepository.findByUserId).toHaveBeenCalledWith('1');
        });
    });

    describe('findOne', () => {
        it('should return a todo if found', async () => {
            const todo = {
                title: 'Test Todo',
                description: 'Test Description',
                status: TodoStatusEnum.RESOLVED,
                user,
            };
            todoRepository.findById.mockResolvedValue(todo);

            const result = await service.findOne('1');

            expect(result).toEqual(todo);
            expect(todoRepository.findById).toHaveBeenCalledWith('1');
        });
    });

    describe('updateStatus', () => {
        it('should update the status of a todo', async () => {
            const todo = {
                title: 'Test Todo',
                description: 'Test Description',
                status: TodoStatusEnum.RESOLVED,
                user,
            };
            const updatedTodo = { ...todo, status: TodoStatusEnum.RESOLVED };

            todoRepository.findByUserAndId.mockResolvedValue(todo);
            todoRepository.update.mockResolvedValue(updatedTodo);

            const result = await service.updateStatus('1', TodoStatusEnum.RESOLVED, user);

            expect(result).toEqual(updatedTodo);
            expect(todoRepository.findByUserAndId).toHaveBeenCalledWith('1', user);
            expect(todoRepository.update).toHaveBeenCalledWith('1', updatedTodo, user);
        });

        it('should throw a NotFoundException if todo not found', async () => {
            todoRepository.findByUserAndId.mockResolvedValue(null);

            await expect(service.updateStatus('1', TodoStatusEnum.RESOLVED, user)).rejects.toThrow(NotFoundException);
        });
    });

    describe('delete', () => {
        it('should call delete method of todoRepository', async () => {
            todoRepository.delete.mockResolvedValue({});

            await service.delete('1', user);

            expect(todoRepository.delete).toHaveBeenCalledWith('1', user);
        });
    });
});
