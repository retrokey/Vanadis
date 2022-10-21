import * as bcrypt from 'bcrypt';
import { Controller, Body, Req, Res, Header, Post, Get } from '@nestjs/common';
import { Response } from 'express';
import { DatabaseProvider } from '../database/database.provider';
import { ResponseUtils } from '../../utils/response.utils';
import { ConfigProvider } from '../config/config.provider';
import { UserLoginDto } from '../../dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { GetUser } from './types/getuser.type';
import { GetStaff } from './types/getstaff.type';
import { GetProfile } from './types/getprofile.type';
import { RCONProvider } from '../rcon/rcon.provider';

@Controller('/users')
export class UserController {
    private readonly _configProvider: ConfigProvider;
    private readonly _databaseProvider: DatabaseProvider;
    private readonly _rconProvider: RCONProvider;

    constructor(configProvider: ConfigProvider, databseProvider: DatabaseProvider, rconProvider: RCONProvider) {
        this._configProvider = configProvider;
        this._databaseProvider = databseProvider;
        this._rconProvider = rconProvider;
    }

    @Post('/get')
    @Header('content-type', 'application/json')
    public async getUser(@Body() body: UserLoginDto, @Res() res: Response): Promise<void> {
        if (body == null) {
            res.statusCode = 400;
            res.send(ResponseUtils.sendMessage('error:Controlla di aver inserito l\'username e la password!'));
            return;
        }

        const user: UserEntity = await this._databaseProvider.connection.getRepository(UserEntity).findOne({
            where: {
                nickname: body.username
            }
        });
        const sendUser: UserEntity = await this._databaseProvider.connection.getRepository(UserEntity).findOne({
            where: {
                nickname: body.username
            },
            relations: [
                'currency'
            ],
            select: [
                'accountId',
                'nickname',
                'avatar',
                'mission',
                'role',
                'rank',
                'status'
            ]
        });

        if (user == null) {
            res.statusCode = 404;
            res.send(ResponseUtils.sendMessage('error:L\'utente ' + body.username + ' non esiste!'));
            return;
        }

        if (!bcrypt.compareSync(body.password, user.password)) {
            res.statusCode = 422;
            res.send(ResponseUtils.sendMessage('error:La password inserita non è corretta!'));
            return;
        }

        await this._databaseProvider.connection.getRepository(UserEntity).update(body.username, {
            status: '1'
        });
        const result: GetUser = {
            'message': 'Benvenuto su ' + this._configProvider.config.vanadis.hotel_name + '!',
            'sso': user.SSO,
            'user': sendUser
        };
        res.statusCode = 200;
        res.send(ResponseUtils.sendUser(result));
    }

    @Get('/get/rank')
    @Header('content-type', 'application/json')
    public async getStaff(@Req() req: Request, @Res() res: Response): Promise<void> {
        if (req.headers['requested-rank'] == undefined) {
            res.statusCode = 400;
            return;
        }

        const user: Array<UserEntity> = await this._databaseProvider.connection.getRepository(UserEntity).find({
            where: {
                rank: parseInt(req.headers['requested-rank'])
            },
            select: [
                'accountId',
                'nickname',
                'avatar',
                'mission',
                'role',
                'status'
            ]
        });

        if (user.length == 0) {
            res.statusCode = 404;
            res.send(ResponseUtils.sendMessage('error:Non ci sono staff per questo rank!'));
            return;
        }

        const result: GetStaff = {
            staffer: user
        };
        res.statusCode = 200;
        res.send(ResponseUtils.sendStaff(result));
    }

    @Get('/get/profile')
    @Header('content-type', 'application/json')
    public async getProfile(@Req() req: Request, @Res() res: Response): Promise<void> {
        if (req.headers['requested-user'] == undefined) {
            res.statusCode = 400;
            return;
        }

        const user: UserEntity = await this._databaseProvider.connection.getRepository(UserEntity).findOne({
            where: {
                nickname: req.headers['requested-user']
            },
            relations: [
                'currency'
            ],
            select: [
                'accountId',
                'nickname',
                'credits',
                'avatar',
                'mission',
                'accountCreation',
                'role',
                'status'
            ]
        });

        if (user === null) {
            res.statusCode = 404;
            res.send(ResponseUtils.sendMessage('error:Non ci sono staff per questo rank!'));
            return;
        }

        let options: any = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        let date: string = new Date(user.accountCreation * 1000).toLocaleDateString('it-IT', options);
        const result: GetProfile = {
            registration: date,
            user: user
        };
        res.statusCode = 200;
        res.send(ResponseUtils.sendProfile(result));
    }
}