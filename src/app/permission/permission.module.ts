import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { PermisisonController } from './permission.controller';

@Module({
    imports: [
        ConfigModule,
        DatabaseModule
    ],
    providers: [

    ],
    controllers: [
        PermisisonController
    ],
    exports: [

    ]
})
export class PermisisonModule { }