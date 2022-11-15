import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigProvider } from '../config/config.provider';
import { UserEntity } from './entities/user.entity';
import { UserCurrencyEntity } from './entities/user_currency.entity';
import { UserSettingsEntity } from './entities/user_settings.entity';
import { FriendsEntity } from './entities/friends.entity';
import { RoomsEntity } from './entities/rooms.entity';
import { NewsEntity } from './entities/news.entity';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionNameEntity } from './entities/permission_name.entity';

@Injectable()
export class DatabaseProvider {
    private readonly _configProvider: ConfigProvider;
    private _connection: DataSource;

    constructor(configProvider: ConfigProvider) {
        this._configProvider = configProvider;
        this.make().then((connection: DataSource) => {
            this._connection = connection;
        });
    }

    private async make(): Promise<DataSource> {
        return await new DataSource({
            type: 'mysql',
            host: this._configProvider.config.database.host,
            port: this._configProvider.config.database.port,
            username: this._configProvider.config.database.user,
            password: this._configProvider.config.database.psw,
            database: this._configProvider.config.database.source,
            synchronize: false,
            supportBigNumbers: true,
            entities: [
                UserEntity,
                UserCurrencyEntity,
                UserSettingsEntity,
                FriendsEntity,
                RoomsEntity,
                NewsEntity,
                PermissionNameEntity,
                PermissionEntity
            ]
        }).initialize();
    }

    public get connection(): DataSource {
        return this._connection;
    }
}
