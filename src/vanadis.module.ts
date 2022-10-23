import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { PermissionModule } from './app/permission/permission.module';

@Module({
    imports: [
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