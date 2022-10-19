import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';

@Module({
    imports: [
        ConfigModule,
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