import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Controller, Body, Req, Res, Header, Post, Get } from '@nestjs/common';
import { ConfigProvider } from '../../core/config/config.provider';
import { DatabaseProvider } from '../../core/database/database.provider';
import { RCONProvider } from '../../core/rcon/rcon.provider';
import { ResponseUtils } from '../../utils/response.utils';
import { UserLoginDto } from './user.dto';
import { UserEntity } from './entities/user.entity';
import { GetUser } from './types/getuser.type';
import { GetStaff } from './types/getstaff.type';
import { GetProfile } from './types/getprofile.type';
import { FriendsEntity } from './entities/friends.entity';

@Controller('/users')
export class UserController {
    private readonly _configProvider: ConfigProvider;
    private readonly _databaseProvider: DatabaseProvider;
    private readonly _rconProvider: RCONProvider;

    constructor(configProvider: ConfigProvider, databseProvider: DatabaseProvider) {
        this._configProvider = configProvider;
        this._databaseProvider = databseProvider;
        //this._rconProvider = rconProvider;
    }

    @Post('/get')
    public async getUser(@Body() body: UserLoginDto, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');
        res.header('access-control-allow-origin', '*');

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
            select: [
                'nickname',
                'avatar',
                'mission',
                'role',
                'status',
                'rank'
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
    public async getStaff(@Req() req: Request, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');

        if (req.headers['requested-rank'] == undefined) {
            res.statusCode = 400;
            return;
        }

        const user: Array<UserEntity> = await this._databaseProvider.connection.getRepository(UserEntity).find({
            where: {
                rank: parseInt(req.headers['requested-rank'])
            },
            select: [
                'nickname',
                'avatar',
                'mission',
                'role',
                'status',
                'rank'
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
    public async getProfile(@Req() req: Request, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');

        /*if (req.headers['requested-user'] == undefined) {
            res.statusCode = 400;
            return;
        }*/

        const user: UserEntity = await this._databaseProvider.connection.getRepository(UserEntity).findOne({
            where: {
                nickname: 'RealCosis'//req.headers['requested-user']
            },
            relations: [
                'currency'
            ],
            select: [
                'id',
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

        const friends: Array<FriendsEntity> = await this._databaseProvider.connection.getRepository(FriendsEntity).find({
            where: {
                user_one_id: user.id
            }
        });
        const friendsArray: Array<UserEntity> = new Array<UserEntity>();
        for (let friend of friends) {
            const user: UserEntity = await this._databaseProvider.connection.getRepository(UserEntity).findOne({
                where: {
                    id: friend.user_two_id
                },
                select: [
                    'nickname',
                    'avatar'
                ]
            });
            friendsArray.push(user);
        }

        let options: any = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        let date: string = new Date(user.accountCreation * 1000).toLocaleDateString('it-IT', options);
        const result: GetProfile = {
            registration: date,
            user: user,
            friends: friendsArray
        };
        res.statusCode = 200;
        res.send(ResponseUtils.sendProfile(result));
    }
}