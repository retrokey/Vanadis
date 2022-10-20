import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigProvider } from '../config/config.provider';
import { PermissionEntity } from '../permission/entities/permission.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserCurrencyEntity } from '../user/entities/users_currency.entity';

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
                PermissionEntity
            ]
        }).initialize();
    }

    public get connection(): DataSource {
        return this._connection;
    }
}