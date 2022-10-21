import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DatabaseProvider } from './database.provider';

@Module({
    imports: [
        ConfigModule
    ],
    providers: [
        DatabaseProvider
    ],
    exports: [
        DatabaseProvider
    ]
})
export class DatabaseModule { }