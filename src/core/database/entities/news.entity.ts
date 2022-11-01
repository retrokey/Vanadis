import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('mythical_news')
export class NewsEntity {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    public id: number;

    @Column({
        name: 'title'
    })
    public name: string;

    @Column({
        name: 'text'
    })
    public content: string;

    @Column({
        name: 'images'
    })
    public image: string;

    @OneToOne(() => UserEntity)
    @JoinColumn({
        name: 'author',
        referencedColumnName: 'id'
    })
    public author: UserEntity;

    @Column({
        name: 'time'
    })
    public time: string;
}