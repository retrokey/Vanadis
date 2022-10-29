import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('messenger_friendships')
export class FriendsEntity {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    public id: number;

    @Column({
        name: 'user_one_id'
    })
    public user_one_id: number;

    @Column({
        name: 'user_two_id'
    })
    public user_two_id: number;

    @ManyToOne(() => UserEntity, user => user.friends)
    @JoinColumn({
        name: 'user_one_id',
        referencedColumnName: 'id'
    })
    public user: UserEntity;
}