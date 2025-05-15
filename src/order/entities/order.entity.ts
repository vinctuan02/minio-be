import { BaseEntity } from 'src/common/entity/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('order')
export class Order extends BaseEntity {
	@Column({ type: 'timestamptz' })
	deadline: Date;
}
