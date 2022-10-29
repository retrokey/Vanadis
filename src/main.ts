import * as fs from 'fs';
import * as path from 'path';
import { INestApplication, Logger, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { VanadisModule } from './vanadis.module';
import { ConfigProvider } from './core/config/config.provider';

async function bootstrap(): Promise<void> {
	let cert: Boolean = fs.existsSync(path.resolve(__dirname, 'resources/SSL/cert.pem'));
	let privkey: Boolean = fs.existsSync(path.resolve(__dirname, 'resources/SSL/privkey.pem'));
    let options: NestApplicationOptions;
    if (cert || privkey) {
        options = {
            httpsOptions: {
                cert: fs.readFileSync(path.resolve(__dirname, 'resources/SSL/cert.pem')),
                key: fs.readFileSync(path.resolve(__dirname, 'resources/SSL/privkey.pem'))
            }
        };
    }
    let vanadis: INestApplication = await NestFactory.create(VanadisModule, options);

    const logger: Logger = new Logger('Vanadis');
    const configProvider: ConfigProvider = vanadis.get(ConfigProvider);
    logger.log('Vanadis - NestJS Engine - By RealCosis');
    if (configProvider.config.vanadis.debug) {
        logger.debug('Vanadis - Debug System: Enabled');
    }

    vanadis.enableCors();

    await vanadis.listen(configProvider.config.http.port);
}

bootstrap();