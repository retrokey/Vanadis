import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Controller, Body, Req, Res, Header, Post, Get, Param, Put } from '@nestjs/common';
import { ConfigProvider } from '../../core/config/config.provider';
import { DatabaseProvider } from '../../core/database/database.provider';
import { RCONProvider } from '../../core/rcon/rcon.provider';
import { ResponseUtils } from '../../utils/response.utils';
import { UserLoginDto, UserUpdateRankDto } from './user.dto';
import { UserEntity } from './entities/user.entity';
import { GetUser } from './types/getuser.type';
import { GetStaff } from './types/getstaff.type';
import { GetProfile } from './types/getprofile.type';
import { FriendsEntity } from './entities/friends.entity';

@Controller('/user')
export class UserController {
    private readonly _configProvider: ConfigProvider;
    private readonly _databaseProvider: DatabaseProvider;
    private readonly _rconProvider: RCONProvider;

    constructor(configProvider: ConfigProvider, databseProvider: DatabaseProvider, rconProvider: RCONProvider) {
        this._configProvider = configProvider;
        this._databaseProvider = databseProvider;
        this._rconProvider = rconProvider;
    }

    @Post('/find')
    public async getUser(@Body() body: UserLoginDto, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');
        res.header('access-control-allow-origin', '*');

        if (body == undefined) {
            res.statusCode = 400;
            res.send(ResponseUtils.sendMessage('error:Check fields'));
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
            res.send(ResponseUtils.sendMessage('error:The user ' + body.username + ' was not found!'));
            return;
        }

        if (!bcrypt.compareSync(body.password, user.password)) {
            res.statusCode = 422;
            res.send(ResponseUtils.sendMessage('error:The inserted password was incorrect!'));
            return;
        }

        const result: GetUser = {
            'message': 'Welcome on ' + this._configProvider.config.vanadis.hotel_name + '!',
            'sso': user.SSO,
            'user': sendUser
        };
        res.statusCode = 200;
        res.send(ResponseUtils.sendUser(result));
    }

    @Get('/rank/:rank')
    public async getStaff(@Param('rank') rankId: string, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');
        res.header('access-control-allow-origin', '*');

        const user: Array<UserEntity> = await this._databaseProvider.connection.getRepository(UserEntity).find({
            where: {
                rank: parseInt(rankId)
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
            res.send(ResponseUtils.sendMessage('error:There doesn\'t have staff for rank ' + parseInt(rankId) + '!'));
            return;
        }

        const result: GetStaff = {
            staffer: user
        };
        res.statusCode = 200;
        res.send(ResponseUtils.sendStaff(result));
    }

    @Get('/profile/:username')
    public async getProfile(@Param('username') username: string,@Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');
        res.header('access-control-allow-origin', '*');

        const user: UserEntity = await this._databaseProvider.connection.getRepository(UserEntity).findOne({
            where: {
                nickname: username
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
                'role',
                'status',
                'accountCreation'
            ]
        });

        if (user === null) {
            res.statusCode = 404;
            res.send(ResponseUtils.sendMessage('error:The user ' + username + ' was didn\'t found!'));
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

    @Put('/update/rank')
    public async updateRank(@Body() body: UserUpdateRankDto, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');
        res.header('access-control-allow-origin', '*');

        const user: UserEntity = await this._databaseProvider.connection.getRepository(UserEntity).findOne({
            where: {
                nickname: body.username
            }
        });

        if (user == null) {
            res.statusCode = 404;
            res.send(ResponseUtils.sendMessage('error:The user ' + body.username + ' was didn\'t found!'));
            return;
        }

        await this._databaseProvider.connection.getRepository(UserEntity).update({id: user.id}, {
            role: body.role,
            rank: body.rank
        });
        this._rconProvider.send({
            key: 'setrank',
            data: {
                user_id: user.id,
                rank: body.rank
            }
        });
    }
}