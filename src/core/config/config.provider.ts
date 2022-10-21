import { Injectable } from '@nestjs/common';
import * as configuration from '../../resources/configuration.json';

@Injectable()
export class ConfigProvider {
    public get config() {
        return configuration;
    }
}