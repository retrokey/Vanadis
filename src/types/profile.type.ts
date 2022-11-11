import { RoomsEntity } from '../core/database/entities/rooms.entity';
import { UserEntity } from '../core/database/entities/user.entity';

export type ProfileType = {
    user: UserEntity;
    friends: UserEntity[];
    rooms: RoomsEntity[];
}
