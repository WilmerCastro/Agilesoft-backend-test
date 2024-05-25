import {User} from "../models/user.model";

export abstract class UserRepository {
    public abstract findAll(): Promise<User[]>;
    public abstract findById(id: string): Promise<User>;
    public abstract save(user: User): Promise<User>;
    public abstract delete(id: string): Promise<void>;
    public abstract findByUsername(username: string): Promise<User>;
}
