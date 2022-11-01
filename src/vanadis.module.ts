import { Module } from '@nestjs/common';
import { NewsModule } from './app/news/news.module';
import { UserModule } from './app/user/user.module';

@Module({
    imports: [
        UserModule,
        NewsModule
    ]
})
export class VanadisModule { }