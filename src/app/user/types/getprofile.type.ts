import { FriendsEntity } from '../entities/friends.entity';
import { UserEntity } from '../entities/user.entity';

export class GetProfile {
    registration: string;
    user: UserEntity;
    friends: UserEntity[];
}