import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigProvider } from '../config/config.provider';
import { PermissionEntity } from '../../app/permission/entities/permission.entity';
import { UserEntity } from '../../app/user/entities/user.entity';
import { UserCurrencyEntity } from '../../app/user/entities/users_currency.entity';
import { FriendsEntity } from '../../app/user/entities/friends.entity';
import { NewsEntity } from '../../app/news/entity/news.entity';

@Injectable()
export class DatabaseProvider {
    private readonly _configProvider: ConfigProvider;
    private _connection: DataSource;

    constructor(
        configProvider: ConfigProvider
    ) {
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
                FriendsEntity,
                NewsEntity,
                PermissionEntity
            ]
        }).initialize();
    }

    public get connection(): DataSource {
        return this._connection;
    }
}