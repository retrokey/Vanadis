import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { PermissionModule } from './app/permission/permission.module';
import { NewsModule } from './app/news/news.module';

@Module({
    imports: [
        UserModule,
        NewsModule,
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