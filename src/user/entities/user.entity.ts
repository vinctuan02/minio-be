import { BaseEntity } from "src/common/entity/base-entity";
import { Column, Entity } from "typeorm";


@Entity('user')
export class User extends BaseEntity {
    @Column({ name: 'email', type: 'varchar', unique: true })
    email: string;

    @Column({ name: 'password', type: 'varchar' })
    password: string;

    @Column({ name: 'last_name', type: 'varchar' })
    lastName: string;

    @Column({ name: 'first_name', type: 'varchar' })
    firstName: string;


}
