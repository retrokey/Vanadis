import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('rooms')
export class RoomsEntity {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    public id: number;

    @Column({
        name: 'owner_id'
    })
    public ownerId: number;

    @Column({
        name: 'name'
    })
    public roomName: string;

    @Column({
        name: 'users'
    })
    public usersCount: number;

    @ManyToOne(() => UserEntity, user => user.rooms)
    @JoinColumn({
        name: 'owner_id',
        referencedColumnName: 'id'
    })
    public user: UserEntity;
}