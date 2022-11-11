import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('users_settings')
export class UserSettingsEntity {
  @PrimaryColumn({
    name: 'user_id'
  })
  public user_id: number;

  @Column({
    name: 'block_following'
  })
  public blockFollowing: '0' | '1';

  @Column({
    name: 'block_friendrequests'
  })
  public blockFriendsRequest: '0' | '1';

  @Column({
    name: 'block_alerts'
  })
  public blockAlerts: '0' | '1';

  @OneToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id'
  })
  public user: UserEntity;
}