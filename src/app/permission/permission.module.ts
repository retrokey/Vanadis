import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PermissionController } from './permission.controller';

@Module({
    imports: [
        DatabaseModule
    ],
    providers: [

    ],
    controllers: [
        PermissionController
    ],
    exports: [

    ]
})
export class PermissionModule { }