import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from '../../domain/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { PasswordUtil } from '../../../shared/utils/password.util';
import { User } from '../../domain/models/user.model';

const mockUserRepository = () => ({
    findByUsername: jest.fn(),
});

const mockJwtService = () => ({
    sign: jest.fn(),
});

describe('AuthService', () => {
    let service: AuthService;
    let userRepository;
    let jwtService;

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
                AuthService,
                { provide: UserRepository, useFactory: mockUserRepository },
                { provide: JwtService, useFactory: mockJwtService },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        userRepository = module.get<UserRepository>(UserRepository);
        jwtService = module.get<JwtService>(JwtService);
    });

    describe('login', () => {
        it('should return an access token and user data if login is successful', async () => {
            userRepository.findByUsername.mockResolvedValue(user);
            jest.spyOn(PasswordUtil, 'comparePassword').mockResolvedValue(true);
            jwtService.sign.mockReturnValue('mockAccessToken');

            const result = await service.login('testuser', 'testpassword');

            expect(result).toEqual({
                accessToken: 'mockAccessToken',
                user: {
                    id: '1',
                    name: 'Test User',
                    username: 'testuser',
                    todos: [],
                    created_at: undefined,
                    updated_at: undefined,
                },
            });
            expect(userRepository.findByUsername).toHaveBeenCalledWith('testuser');
            expect(jwtService.sign).toHaveBeenCalledWith({ id: '1', username: 'testuser' });
        });

        it('should throw UnauthorizedException if login fails', async () => {
            userRepository.findByUsername.mockResolvedValue(user);
            jest.spyOn(PasswordUtil, 'comparePassword').mockResolvedValue(false);

            await expect(service.login('testuser', 'testpassword')).rejects.toThrow(UnauthorizedException);
        });

        it('should throw UnauthorizedException if user is not found', async () => {
            userRepository.findByUsername.mockResolvedValue(null);

            await expect(service.login('testuser', 'testpassword')).rejects.toThrow(UnauthorizedException);
        });
    });
});
