// import { BaseEntity } from 'src/common/entity/base-entity';
// import { Column, Entity } from 'typeorm';

// @Entity('log')
// export class LoggerEntity extends BaseEntity {
// 	@Column()
// 	action: string;

// 	@Column({ nullable: true })
// 	country: string | null;

// 	@Column({ nullable: true })
// 	city: string | null;

// 	@Column({ name: 'original_url', nullable: true, type: 'text' })
// 	originalUrl: string | null;

// 	@Column({ name: 'status_code', nullable: true })
// 	statusCode: number | null;

// 	@Column({ type: 'text', nullable: true })
// 	content: string | null;

// 	@Column({ nullable: true })
// 	response: string | null;

// 	@Column({ nullable: true })
// 	email: string | null;

// 	@Column({ name: 'user_creator_id', nullable: true })
// 	userCreatorId: string | null;

// 	@Column({ type: 'text', nullable: true })
// 	note: string | null;

// 	@Column()
// 	success: boolean;

// 	@Column({ name: 'user_agent', nullable: true })
// 	userAgent: string | null;
// }

import { BaseEntity } from 'src/common/entity/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('logger')
export class LoggerEntity extends BaseEntity {
	@Column()
	method: string;

	@Column()
	url: string;

	@Column('text', { nullable: true })
	userAgent?: string;
}
