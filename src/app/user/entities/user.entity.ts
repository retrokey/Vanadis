import { Entity, Index, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { UserCurrencyEntity } from './users_currency.entity';

@Entity('users')
export class UserEntity {
    @Index()
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    public accountId: number;

    @Column({
        name: 'username'
    })
    public nickname: string;

    @Column({
        name: 'password'
    })
    public password: string;

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
        name: 'accountId',
        referencedColumnName: 'user_id'
    })
    public currency: UserCurrencyEntity[];
}