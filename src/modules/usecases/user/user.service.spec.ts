import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PasswordUtil } from '../../../shared/utils/password.util';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { User } from '../../domain/models/user.model';

const mockUserRepository = () => ({
    findByUsername: jest.fn(),
    save: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
});

describe('UserService', () => {
    let service: UserService;
    let userRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: UserRepository, useFactory: mockUserRepository },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    describe('create', () => {
        it('should throw an error if user already exists', async () => {
            userRepository.findByUsername.mockResolvedValue({ id: '1', username: 'testuser' });

            await expect(
                service.create({ username: 'testuser', password: 'password' } as User),
            ).rejects.toThrow(BadRequestException);
        });

        it('should create a new user successfully', async () => {
            userRepository.findByUsername.mockResolvedValue(null);
            userRepository.save.mockResolvedValue({ id: '1', username: 'testuser', password: 'hashedpassword' });

            jest.spyOn(PasswordUtil, 'hashPassword').mockResolvedValue('hashedpassword');

            const result = await service.create({ username: 'testuser', password: 'password' } as User);

            expect(result).toEqual({ id: '1', username: 'testuser' });
        });
    });

    describe('findByUsername', () => {
        it('should return a user if found', async () => {
            const user = { id: '1', username: 'testuser', password: 'password' };
            userRepository.findByUsername.mockResolvedValue(user);

            const result = await service.findByUsername('testuser');

            expect(result).toEqual(user);
        });

        it('should throw an error if user not found', async () => {
            userRepository.findByUsername.mockResolvedValue(null);

            await expect(service.findByUsername('testuser')).rejects.toThrow(UnauthorizedException);
        });
    });

    describe('findOne', () => {
        it('should return a user if found', async () => {
            const user = { id: '1', username: 'testuser', password: 'password' };
            userRepository.findById.mockResolvedValue(user);

            const result = await service.findOne('1');

            expect(result).toEqual(user);
        });

        it('should throw an error if user not found', async () => {
            userRepository.findById.mockResolvedValue(null);

            await expect(service.findOne('1')).rejects.toThrow(UnauthorizedException);
        });
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const users = [
                { id: '1', username: 'testuser1', password: 'password' },
                { id: '2', username: 'testuser2', password: 'password' },
            ];
            userRepository.findAll.mockResolvedValue(users);

            const result = await service.findAll();

            expect(result).toEqual(users);
        });
    });

    describe('remove', () => {
        it('should call delete method of userRepository', async () => {
            userRepository.delete.mockResolvedValue({});

            await service.remove('1');

            expect(userRepository.delete).toHaveBeenCalledWith('1');
        });
    });
});
