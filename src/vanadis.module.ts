import { Module } from '@nestjs/common';
import { ConfigModule } from './app/config/config.module';
import { UserModule } from './app/user/user.module';

@Module({
    imports: [
        ConfigModule,
        UserModule
    ],
    providers: [
        
    ],
    controllers: [
        
    ],
    exports: [

    ]
})
export class VanadisModule { }