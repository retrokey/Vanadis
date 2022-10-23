import { Response } from 'express';
import { Controller, Res, Get, Query, Param } from '@nestjs/common';
import { DatabaseProvider } from '../../core/database/database.provider';
import { ResponseUtils } from '../../utils/response.utils';
import { NewsEntity } from './entity/news.entity';
import { GetNews } from './types/getnews.type';

@Controller('/news')
export class NewsController {
    private readonly _databaseProvider: DatabaseProvider;

    constructor(databseProvider: DatabaseProvider) {
        this._databaseProvider = databseProvider;
    }

    @Get('/lists')
    public async getLists(@Query('page') page: number, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');

        let newsList: Array<NewsEntity> = await this._databaseProvider.connection.getRepository(NewsEntity).find({
            take: 4,
            skip: page
        });

        if (newsList.length == 0) {
            res.statusCode = 404;
            res.send(ResponseUtils.sendMessage('error:There doesn\'t have news!'));
            return;
        }

        const result: GetNews = {
            archive: newsList
        };
        res.statusCode = 200;
        res.send(ResponseUtils.sendNews(result));
    }

    @Get('/:id')
    public async getNews(@Param('id') news: number, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');

        let newsData: NewsEntity = await this._databaseProvider.connection.getRepository(NewsEntity).findOne({
            where: {
                id: news
            }
        });

        if (newsData == null) {
            res.statusCode = 404;
            res.send(ResponseUtils.sendMessage('error:The news was didn\'t find!'));
            return;
        }

        const result: GetNews = {
            news: newsData
        };
        res.statusCode = 200;
        res.send(ResponseUtils.sendNews(result));
    }
}