import {Todo} from "./todo.model";

export class User {
    id?: string;
    name: string;
    username: string;
    todos?: Todo[];
    password: string;
    created_at?: Date;
    updated_at?: Date;
}
