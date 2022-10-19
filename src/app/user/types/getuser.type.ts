import { UserEntity } from '../entities/user.entity';

export class GetUser {
    message: string;
    sso: string;
    user: UserEntity;
}