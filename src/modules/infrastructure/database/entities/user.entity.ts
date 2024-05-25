import {
    Entity,
    Column, OneToMany, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import {TodoEntity} from "./todo.entity";

@Entity({ name: 'users' })
export class UserEntity {
    @Column({
        nullable: false,
        primary: true,
        type: 'varchar',
        length: 255,
    })
    id?: string;

    @Column({
        nullable: false,
        name: 'username',
        type: 'varchar',
        length: 255,
    })
    username: string;

    @Column({
        nullable: false,
        unique: true,
        type: 'varchar',
        length: 255,
    })
    name: string;

    @Column({
        nullable: false,
        unique: true,
        type: 'varchar',
        length: 255,
    })
    password: string;

    @OneToMany(() => TodoEntity, (todo) => todo.user)
    todos: TodoEntity[];

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt?: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt?: Date;
}
