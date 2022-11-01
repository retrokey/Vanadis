import { Request, Response } from 'express';
import { Controller, Get, Param, Req, Res } from '@nestjs/common';
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
    public async getNewsList(@Req() req: Request, @Res() res: Response): Promise<void> {
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

    @Get('/read/:id')
     async getNews(@Param('id') id: number, @Req() req: Request, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');
        res.header('access-control-allow-origin', '*');

        const news: NewsEntity = await this._databaseProvider.connection.getRepository<NewsEntity>(NewsEntity).findOne({
            relations: [
                'author'
            ],
            where: {
                id: id
            }
        });

        if (news == null) {
            res.statusCode = 404;
            res.statusMessage = '404 - news didn\'t find';
            res.send(ResponseUtils.message(req, res, 'error:The selected news was didn\'t find!'))
            return;
        }

        const result: NewsType = {
            news: news
        }
        res.statusCode = 200;
        res.statusMessage = '200 - News OK';
        res.send(ResponseUtils.news(req, res, result));
    }
}