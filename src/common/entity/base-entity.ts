import {
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { TypeID } from '../typeorm/enum/db-type.enum';

export class BaseDateEntity {
	@CreateDateColumn({ type: 'timestamptz' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updatedAt: Date;
}

export class BaseEntity extends BaseDateEntity {
	@PrimaryGeneratedColumn()
	id: TypeID;
}
