import { Request, Response } from 'express';
import { Logger, Req, Res } from '@nestjs/common';
import { ProfileType } from '../types/profile.type';
import { ResponseType } from '../types/response.type';
import { StaffType } from '../types/staff.type';
import { UserType } from '../types/user.type';
import { ConfigProvider } from '../core/config/config.provider';

export class ResponseUtils {
    private static readonly _configProvider: ConfigProvider = new ConfigProvider();

    private static send(@Req() req: Request, @Res() res: Response, data: ResponseType): string {
        if (this._configProvider.config.vanadis.debug) {
            const logger: Logger = new Logger('ResponseManager');
            logger.debug('REQUESTED: ' + req.url + ' || FROM: ' + req.ip + ' || RESPONSE STATUS: ' + data.status);
        }
        return JSON.stringify({
            status: data.status,
            data: data.data
        }, null, 3);
    }

    public static message(@Req() req: Request, @Res() res: Response, message: string): string {
        let split: Array<string> = message.split(':');
        let send: ResponseType = {
            status: split[0],
            data: split[1]
        }
        return this.send(req, res, send);
    }

    public static user(@Req() req: Request, @Res() res: Response, object: UserType): string {
        let send: ResponseType = {
            status: 'success',
            data: object
        }
        return this.send(req, res, send);
    }

    public static staff(@Req() req: Request, @Res() res: Response, object: StaffType): string {
        let send: ResponseType = {
            status: 'success',
            data: object
        }
        return this.send(req, res, send);
    }

    public static profile(@Req() req: Request, @Res() res: Response, object: ProfileType): string {
        let send: ResponseType = {
            status: 'success',
            data: object
        }
        return this.send(req, res, send);
    }
}