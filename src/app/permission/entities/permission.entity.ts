import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mythical_permission')
export class PermissionEntity {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    public id: number;

    @Column({
        name: 'permission'
    })
    public permissionName: string;

    @Column({
        name: 'rank'
    })
    public rankId: number;
}