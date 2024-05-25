import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import {UserEntity} from "./user.entity";
import {TodoStatusEnum} from "../../../../shared/enums/todo-status.enum";

@Entity({ name: 'todos' })
export class TodoEntity {
    @Column({
        nullable: false,
        primary: true,
        type: 'varchar',
        length: 255,
    })
    id: string;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 255,
    })
    title: string;

    @Column({
        nullable: true,
        type: 'varchar',
    })
    description: string;

    @Column({
        nullable: false,
        type: 'enum',
        enum: TodoStatusEnum
    })
    status: TodoStatusEnum;

    @ManyToOne(() => UserEntity, (user) => user.todos)
    @JoinColumn({
        name: 'user_id',
    })
    user: UserEntity;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt?: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt?: Date;
}
