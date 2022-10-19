import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { VanadisModule } from './vanadis.module';
import { ConfigProvider } from './app/config/config.provider';
import helmet from 'helmet';

process.title = 'Vanadis';
async function bootstrap(): Promise<void> {
    const logger: Logger = new Logger('VanadisIntroducer');
    logger.log('Vanadis - NestJS Engine');
    logger.log('Vanadis - v1.0.0 - By RealCosis');

    let vanadis: INestApplication = await NestFactory.create(VanadisModule);

    const configProvider: ConfigProvider = vanadis.get(ConfigProvider);
    if (configProvider.config.vanadis.debug) {
        logger.debug('Vanadis - Debug System: Enabled');
    }

    vanadis.use(helmet());
    vanadis.enableCors();

    await vanadis.listen(configProvider.config.http.port, configProvider.config.http.host);
}

bootstrap();