export class UserLoginDto {
    public username: string;
    public password: string;
}

export class UserRegistrationDto {
    public username: string;
    public mail: string;
    public password: string;
}

export class UserSettingsDto {
    public following?: '0' | '1';
    public friendrequests?: '0' | '1';
    public alerts?: '0' | '1';
}