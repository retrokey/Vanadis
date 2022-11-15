import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mythical_permission_name')
export class PermissionNameEntity {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    public id: number;

    @Column({
        name: 'permission'
    })
    public name: string;

    @Column({
        name: 'description'
    })
    public desc: string;
}