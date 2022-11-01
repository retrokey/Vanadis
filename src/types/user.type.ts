import { UserEntity } from '../core/database/entities/user.entity';

export type UserType = {
    token: string;
    user: UserEntity;
}