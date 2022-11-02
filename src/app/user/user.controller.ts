import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Controller, Body, Req, Res, Post, Get, Param, ConsoleLogger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseProvider } from '../../core/database/database.provider';
import { ResponseUtils } from '../../utils/response.utils';
import { UserLoginDto, UserRegistrationDto } from './user.dto';
import { UserEntity } from '../../core/database/entities/user.entity';
import { FriendsEntity } from '../../core/database/entities/friends.entity';
import { RoomsEntity } from '../../core/database/entities/rooms.entity';
import { UserType } from '../../types/user.type';
import { StaffType } from '../../types/staff.type';
import { ProfileType } from '../../types/profile.type';

@Controller('/user')
export class UserController {
    private readonly _databaseProvider: DatabaseProvider;
    private readonly _jwtService: JwtService;

    constructor(databseProvider: DatabaseProvider, jwtService: JwtService) {
        this._databaseProvider = databseProvider;
        this._jwtService = jwtService;
    }

    @Post('/find')
    public async getUser(@Body() body: UserLoginDto, @Req() req: Request, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');
        res.header('access-control-allow-origin', '*');

        if (body.username.length == 0 || body.password.length == 0) {
            res.statusCode = 400;
            res.statusMessage = '400 - Check login fields';
            res.send(ResponseUtils.message(req, res, 'error:Check username or password fields!'));
            return;
        }

        const user: UserEntity = await this._databaseProvider.connection.getRepository<UserEntity>(UserEntity).findOne({
            where: {
                nickname: body.username
            }
        });
        if (user == null) {
            res.statusCode = 404;
            res.statusMessage = '404 - The requested user wasn\'t found!';
            res.send(ResponseUtils.message(req, res, 'error:The user ' + body.username + ' wasn\'t found!'));
            return;
        }
        const password: UserEntity = await this._databaseProvider.connection.getRepository<UserEntity>(UserEntity).findOne({
            select: [
                'password'
            ],
            where: {
                id: user.id
            }
        });
        if (!bcrypt.compareSync(body.password, password.password)) {
            res.statusCode = 422;
            res.statusMessage = '422 - The password was incorrect';
            res.send(ResponseUtils.message(req, res, 'error:The inserted password was incorrect!'));
            return;
        }

        const result: UserType = {
            token: this._jwtService.sign({
                user
            }, {
                secret: 'cosimo',
                expiresIn: '12h'
            }),
            user: user
        };
        res.statusCode = 200;
        res.statusMessage = '200 - Login OK';
        res.send(ResponseUtils.user(req, res, result));
    }

    @Get('/verify')
    public async verifyToken(@Req() req: Request, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');
        res.header('access-control-allow-origin', '*');

        try {
            const jwt: { user: UserEntity } = this._jwtService.verify(req.headers['token'].toString(), {
                secret: 'cosimo'
            });
            const result: UserType = {
                token: req.headers['token'].toString(),
                user: jwt.user
            };
            res.statusCode = 200;
            res.statusMessage = '200 - Login OK';
            res.send(ResponseUtils.user(req, res, result));
        } catch (e) {
            res.statusCode = 200;
            res.statusMessage = '200 - Login NOT OK';
            res.send(ResponseUtils.message(req, res, 'error:Token expired!'));
        }
    }

    @Post('/new')
    public async newUser(@Body() body: UserRegistrationDto, @Req() req: Request, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');
        res.header('access-control-allow-origin', '*');

        if (body.username.length == 0 || body.password.length == 0) {
            res.statusCode = 400;
            res.statusMessage = '400 - Check registration fields';
            res.send(ResponseUtils.message(req, res, 'error:Check the registration fields!'));
            return;
        }

        const user: UserEntity = await this._databaseProvider.connection.getRepository<UserEntity>(UserEntity).findOne({
            where: {
                nickname: body.username
            }
        });
        if (user != null) {
            res.statusCode = 409;
            res.statusMessage = '409 - User already exists';
            res.send(ResponseUtils.message(req, res, 'error:An user with username ' + user.nickname + ' already exists!'));
            return;
        }

        const mail: UserEntity = await this._databaseProvider.connection.getRepository<UserEntity>(UserEntity).findOne({
            where: {
                mail: body.mail
            }
        });
        if (mail != null) {
            res.statusCode = 409;
            res.statusMessage = '409 - User already exists';
            res.send(ResponseUtils.message(req, res, 'error:An user with email ' + mail.mail + ' already exists!'));
            return;
        }

        const passwordCrypt: string = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));
        await this._databaseProvider.connection.getRepository(UserEntity).insert({
            nickname: body.username,
            password: passwordCrypt,
            mail: body.mail,
            accountCreation: Math.floor(Date.now() / 1000),
            rank: 1,
            mission: 'Welcome',
            SSO: (Math.random() + 1).toString(36).substring(2),
            registerIp: req.ip,
            currentIp: req.ip
        });
        const inserted: UserEntity = await this._databaseProvider.connection.getRepository(UserEntity).findOne({
            where: {
                nickname: body.username
            }
        });
        const result: UserType = {
            token: this._jwtService.sign(inserted),
            user: inserted
        };
        res.statusCode = 200;
        res.statusMessage = '200 - Registration OK';
        res.send(ResponseUtils.user(req, res, result));
    }

    @Get('/rank/:rank')
    public async getStaff(@Param('rank') rankId: string, @Req() req: Request, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');
        res.header('access-control-allow-origin', '*');

        const user: Array<UserEntity> = await this._databaseProvider.connection.getRepository<UserEntity>(UserEntity).find({
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
            res.send(ResponseUtils.message(req, res, 'error:There doesn\'t have staff for rank ' + parseInt(rankId) + '!'));
            return;
        }

        const result: StaffType = {
            staffer: user
        };
        res.statusCode = 200;
        res.send(ResponseUtils.staff(req, res, result));
    }

    @Get('/profile/:username')
    public async getProfile(@Param('username') username: string, @Req() req: Request, @Res() res: Response): Promise<void> {
        res.header('content-type', 'application/json');
        res.header('access-control-allow-origin', '*');

        const user: UserEntity = await this._databaseProvider.connection.getRepository<UserEntity>(UserEntity).findOne({
            where: {
                nickname: username
            },
            relations: [
                'currency'
            ]
        });

        if (user === null) {
            res.statusCode = 404;
            res.send(ResponseUtils.message(req, res, 'error:The user ' + username + ' was didn\'t found!'));
            return;
        }

        const friends: Array<FriendsEntity> = await this._databaseProvider.connection.getRepository<FriendsEntity>(FriendsEntity).find({
            where: {
                user_one_id: user.id
            },
            take: 4
        });
        const friendsArray: Array<UserEntity> = new Array<UserEntity>();
        for (let friend of friends) {
            const user: UserEntity = await this._databaseProvider.connection.getRepository<UserEntity>(UserEntity).findOne({
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

        const rooms: Array<RoomsEntity> = await this._databaseProvider.connection.getRepository<RoomsEntity>(RoomsEntity).find({
            select: [
                'id',
                'roomName',
                'usersCount'
            ],
            where: {
                ownerId: user.id
            },
            take: 2
        });

        let options: any = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        let date: string = new Date(user.accountCreation * 1000).toLocaleDateString('it-IT', options);
        const result: ProfileType = {
            registration: date,
            user: user,
            friends: friendsArray,
            rooms: rooms
        };
        res.statusCode = 200;
        res.send(ResponseUtils.profile(req, res, result));
    }
}