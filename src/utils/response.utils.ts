import { GetProfile } from '../app/user/types/getprofile.type';
import { GetStaff } from '../app/user/types/getstaff.type';
import { GetUser } from '../app/user/types/getuser.type';
import { ResponseType } from '../types/response.type';

export class ResponseUtils {
    public static sendMessage(value: string) {
        let split: Array<string> = value.toString().split(':');
        let pretty: ResponseType = {
            status: split[0],
            response: split[1]
        };

        return JSON.stringify({
            status: pretty.status,
            data: pretty.response
        }, null, 3);
    }

    public static sendProfile(json: GetProfile) {
        let pretty: ResponseType = {
            status: 'success',
            response: {
                'registration': json.registration,
                'user': json.user
            }
        };

        return JSON.stringify({
            status: pretty.status,
            data: pretty.response
        }, null, 3);  
    }

    public static sendUser(json: GetUser) {
        let pretty: ResponseType = {
            status: 'success',
            response: {
                'message': json.message,
                'sso': json.sso,
                'user': json.user
            }
        };

        return JSON.stringify({
            status: pretty.status,
            data: pretty.response
        }, null, 3);  
    }

    public static sendStaff(json: GetStaff) {
        let pretty: ResponseType = {
            status: 'success',
            response: {
                'staffer': json.staffs
            }
        };

        return JSON.stringify({
            status: pretty.status,
            data: pretty.response
        }, null, 3);  
    }
}