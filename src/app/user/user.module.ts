import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { RCONModule } from '../rcon/rcon.module';
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