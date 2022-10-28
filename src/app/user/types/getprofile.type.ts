import { RoomsEntity } from '../entities/rooms.entity';
import { UserEntity } from '../entities/user.entity';

export class GetProfile {
    registration: string;
    user: UserEntity;
    friends: UserEntity[];
    rooms: RoomsEntity[];
}