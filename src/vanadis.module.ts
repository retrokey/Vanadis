import { Module } from '@nestjs/common';
import { ConfigModule } from './app/config/config.module';
import { PermisisonModule } from './app/permission/permission.module';
import { UserModule } from './app/user/user.module';

@Module({
    imports: [
        ConfigModule,
        UserModule,
        PermisisonModule
    ],
    providers: [
        
    ],
    controllers: [
        
    ],
    exports: [

    ]
})
export class VanadisModule { }