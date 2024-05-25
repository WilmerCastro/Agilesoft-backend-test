import {User} from "../../domain/models/user.model";

export abstract class UserUseCase {
    public abstract create(user: User): Promise<User>;
    public abstract findOne(id: string): Promise<User>;
    public abstract findAll(): Promise<User[]>;
    public abstract findByUsername(username: string): Promise<User>;
    public abstract remove(id: string): Promise<void>;
}
