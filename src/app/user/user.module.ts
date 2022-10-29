import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../core/database/database.module';
import { UserController } from './user.controller';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        UserController
    ]
})
export class UserModule { }