import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../core/database/database.module';
import { NewsController } from './news.controller';

@Module({
    imports: [
        DatabaseModule 
    ],
    controllers: [
        NewsController
    ]
})
export class NewsModule { }