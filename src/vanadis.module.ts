import { Module } from '@nestjs/common';
import { ConfigModule } from './app/config/config.module';
import { PermissionModule } from './app/permission/permission.module';
import { RCONModule } from './app/rcon/rcon.module';
import { UserModule } from './app/user/user.module';

@Module({
    imports: [
        ConfigModule,
        RCONModule,
        UserModule,
        PermissionModule
    ],
    providers: [
        
    ],
    controllers: [
        
    ],
    exports: [

    ]
})
export class VanadisModule { }