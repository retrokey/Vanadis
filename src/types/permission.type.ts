import { PermissionEntity } from "../core/database/entities/permission.entity";

export type PermissionType = {
    lists: Array<PermissionEntity>;
}