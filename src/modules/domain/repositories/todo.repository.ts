import {Todo} from "../models/todo.model";
import {User} from "../models/user.model";

export abstract class TodoRepository {
    public abstract findAll(): Promise<Todo[]>;
    public abstract findById(id: string): Promise<Todo>;
    public abstract save(todo: Todo): Promise<Todo>;
    public abstract delete(id: string, user: User): Promise<void>;
    public abstract update(id: string, todo: Todo, user: User): Promise<Todo>;
    public abstract findByUserId(userId: string): Promise<Todo[]>;
    public abstract findByUserAndId(id: string, user: User): Promise<Todo>;
}
