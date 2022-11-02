import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mythical_permission')
export class PermissionEntity {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    public id: number;

    @Column({
        name: 'permission'
    })
    public name: string;

    @Column({
        name: 'rank'
    })
    public rankId: number;

    @Column({
        name: 'description'
    })
    public desc: string;
}