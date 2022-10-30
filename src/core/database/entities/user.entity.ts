import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { FriendsEntity } from './friends.entity';
import { RoomsEntity } from './rooms.entity';
import { UserCurrencyEntity } from './users_currency.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    public id: number;

    @Column({
        name: 'username'
    })
    public nickname: string;

    @Column({
        name: 'mail'
    })
    public mail: string;

    @Column({
        name: 'password',
        select: false
    })
    public password: string;

    @Column({
        name: 'ip_register',
        select: false
    })
    public registerIp: string;

    @Column({
        name: 'ip_current',
        select: false
    })
    public currentIp: string;

    @Column({
        name: 'role'
    })
    public role: string;

    @Column({
        name: 'rank'
    })
    public rank: number;

    @Column({
        name: 'online'
    })
    public status: '0' | '1';

    @Column({
        name: 'credits'
    })
    public credits: number;

    @Column({
        name: 'account_created'
    })
    public accountCreation: number;

    @Column({
        name: 'auth_ticket'
    })
    public SSO: string;

    @Column({
        name: 'look'
    })
    public avatar: string;

    @Column({
        name: 'motto'
    })
    public mission: string;

    @OneToMany(() => UserCurrencyEntity, currency => currency.user)
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'user_id'
    })
    public currency: UserCurrencyEntity[];

    @OneToMany(() => FriendsEntity, friends => friends.user)
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'user_one_id'
    })
    public friends: FriendsEntity[];

    @OneToMany(() => RoomsEntity, friends => friends.user)
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'owner_id'
    })
    public rooms: RoomsEntity[];
}