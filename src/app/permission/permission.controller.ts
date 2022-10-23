import { Response } from 'express';
import { Controller, Res, Header, Get, Param } from '@nestjs/common';
import { DatabaseProvider } from '../../core/database/database.provider';
import { ResponseUtils } from '../../utils/response.utils';
import { PermissionEntity } from './entities/permission.entity';
import { GetPermission } from './types/getpermisison.type';

@Controller('/permission')
export class PermissionController {
    private readonly _databaseProvider: DatabaseProvider;

    constructor(databseProvider: DatabaseProvider) {
        this._databaseProvider = databseProvider;
    }

    @Get('/get/:permission')
    public async getPermission(@Param('permission') permission: string, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');

        if (permission.length == 0) {
            res.statusCode = 400;
            return;
        }

        const permissionData: PermissionEntity = await this._databaseProvider.connection.getRepository(PermissionEntity).findOne({
            where: {
                permissionName: permission
            },
            select: [
                'permissionName',
                'rankId'
            ]
        });

        if (permissionData == null) {
            res.statusCode = 404;
            res.send(ResponseUtils.sendMessage('error:Il permesso non è stato trovato!'));
            return;
        }

        const result: GetPermission = {
            permission: permissionData.permissionName,
            rank: permissionData.rankId
        };
        res.statusCode = 200;
        res.send(ResponseUtils.sendPermission(result));
    }
}