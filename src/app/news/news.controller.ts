import { Request, Response } from 'express';
import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { DatabaseProvider } from '../../core/database/database.provider';
import { NewsEntity } from '../../core/database/entities/news.entity';
import { ResponseUtils } from '../../utils/response.utils';
import { ListType } from '../../types/list.type';

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

        const newsLists: Array<NewsEntity> = await this._databaseProvider.connection.getRepository(NewsEntity).find({
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

        const result: ListType<NewsEntity> = {
            lists: newsLists
        }
        res.statusCode = 200;
        res.statusMessage = '200 - News List OK';
        res.send(ResponseUtils.news(req, res, result));
    }

    @Get('/remove/:id')
    public async removeNews(@Param('id') newsId: number, @Req() req: Request, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');
        res.header('access-control-allow-origin', '*');

        const news: NewsEntity = await this._databaseProvider.connection.getRepository(NewsEntity).findOne({
            relations: [
                'author'
            ],
            where: {
                id: newsId
            }
        });

        if (news == null) {
            res.statusCode = 404;
            res.statusMessage = '404 - News NOT OK';
            res.send(ResponseUtils.message(req, res, 'error:The news was didn\'t find!'))
            return;
        }

        await this._databaseProvider.connection.getRepository(NewsEntity).remove(news);
        res.statusCode = 200;
        res.statusMessage = '200 - News OK';
        res.send(ResponseUtils.message(req, res, 'success:News was successfully deleted!'));
    }
}