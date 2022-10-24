import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../core/database/database.module';
import { PermissionController } from './permission.controller';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        PermissionController
    ]
})
export class PermissionModule { }