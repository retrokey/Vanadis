import { Request, Response } from 'express';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { DatabaseProvider } from '../../core/database/database.provider';
import { NewsEntity } from '../../core/database/entities/news.entity';
import { ResponseUtils } from '../../utils/response.utils';
import { NewsType } from '../../types/news.type';

@Controller('/news')
export class NewsController {
    private readonly _databaseProvider: DatabaseProvider;

    constructor(databseProvider: DatabaseProvider) {
        this._databaseProvider = databseProvider;
    }

    @Get('/lists')
    public async getNews(@Req() req: Request, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');
        res.header('access-control-allow-origin', '*');

        const newsLists: Array<NewsEntity> = await this._databaseProvider.connection.getRepository<NewsEntity>(NewsEntity).find({
            relations: [
                'author'
            ],
            order: {
                id: 'DESC'
            },
            take: 10
        });

        if (newsLists.length == 0) {
            res.statusCode = 404;
            res.statusMessage = '404 - Doesn\'t have news';
            res.send(ResponseUtils.message(req, res, 'error:Doesn\'t have news!'))
            return;
        }

        const result: NewsType = {
            lists: newsLists
        }
        res.statusCode = 200;
        res.statusMessage = '200 - News List OK';
        res.send(ResponseUtils.news(req, res, result));
    }
}