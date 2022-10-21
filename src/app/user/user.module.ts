import { Module } from '@nestjs/common';
import { ConfigModule } from '../../core/config/config.module';
import { DatabaseModule } from '../../core/database/database.module';
import { RCONModule } from '../../core/rcon/rcon.module';
import { UserController } from './user.controller';

@Module({
    imports: [
        ConfigModule,
        RCONModule,
        DatabaseModule
    ],
    providers: [

    ],
    controllers: [
        UserController
    ],
    exports: [

    ]
})
export class UserModule { }