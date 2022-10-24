export class UserLoginDto {
    public username: string;
    public password: string;
}

export class UserUpdateRankDto {
    public username: string;
    public role: string;
    public rank: number;
}