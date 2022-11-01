import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../../core/database/database.module';
import { UserController } from './user.controller';

@Module({
    imports: [
        DatabaseModule,
        JwtModule
    ],
    controllers: [
        UserController
    ]
})
export class UserModule { }