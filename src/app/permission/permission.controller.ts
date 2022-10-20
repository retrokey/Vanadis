import { Controller, Res, Header, Get, Param } from '@nestjs/common';
import { Response } from 'express';
import { DatabaseProvider } from '../database/database.provider';
import { ResponseUtils } from '../../utils/response.utils';
import { ConfigProvider } from '../config/config.provider';
import { PermissionEntity } from './entities/permission.entity';
import { GetPermission } from './types/getpermisison.type';

@Controller('/permission')
export class PermisisonController {
    private readonly _configProvider: ConfigProvider;
    private readonly _databaseProvider: DatabaseProvider;

    constructor(configProvider: ConfigProvider, databseProvider: DatabaseProvider) {
        this._configProvider = configProvider;
        this._databaseProvider = databseProvider;
    }

    @Get('/get/:permission')
    @Header('accept', 'application/json')
    @Header('content-type', 'application/json')
    public async getPermission(@Param('permission') permission: string, @Res() res: Response): Promise<void> {
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