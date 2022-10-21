import { Module } from '@nestjs/common';
import { RCONModule } from './core/rcon/rcon.module';
import { UserModule } from './app/user/user.module';
import { PermissionModule } from './app/permission/permission.module';

@Module({
    imports: [
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