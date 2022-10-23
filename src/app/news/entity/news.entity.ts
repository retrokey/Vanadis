import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
    public text: string;

    @Column({
        name: 'images'
    })
    public images: string;

    @Column({
        name: 'author'
    })
    public authorId: number;
}