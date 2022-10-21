import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { RCONProvider } from './rcon.provider';

@Module({
    imports: [
        ConfigModule
    ],
    providers: [
        RCONProvider
    ],
    exports: [
        RCONProvider
    ]
})
export class RCONModule {}