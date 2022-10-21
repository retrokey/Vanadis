import { Injectable } from '@nestjs/common';
import { Socket } from 'net';
import { ConfigProvider } from '../config/config.provider';

@Injectable()
export class RCONProvider {
    private readonly _configProvider: ConfigProvider;
    private _client: Socket;

    constructor(configProvider: ConfigProvider) {
        this._configProvider = configProvider;
        this.setClient();
    }

    private setClient(): void {
        this._client = new Socket();
        this._client.connect(this._configProvider.config.rcon.port, this._configProvider.config.rcon.host);
    }

    public send(data: Object): void {
        let sendData: string = JSON.stringify(data);
        this._client.write(sendData);
    }
}