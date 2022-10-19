import { Entity, Column, ManyToOne, PrimaryColumn, Index, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('users_currency')
export class UserCurrencyEntity {
    @Column({
        name: 'user_id'
    })
    public user_id: number;

    @PrimaryColumn({
        name: 'type'
    })
    public currencyType: number;

    @Column({
        name: 'amount'
    })
    public currencyAmount: number;

    @ManyToOne(() => UserEntity, user => user.currency)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'accountId'
    })
    public user: UserEntity;
}