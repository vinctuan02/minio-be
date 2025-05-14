import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class DateEntity {
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export class BaseEntity extends DateEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
}