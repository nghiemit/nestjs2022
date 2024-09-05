import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { json } from 'body-parser';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appPort = configService.get<string>('APP_PORT', '6000');
  const appEnv = configService.get<string>('APP_ENV', 'local');
  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('SWAGGER_TITLE', 'Simple-api'))
    .setDescription('The apis document')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(appPort);
  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet());

  app.use(json({ limit: '4mb' }));
  const logger = new Logger(NestApplication.name);
  logger.verbose(`Application listening in port: ${appPort} - ${appEnv}`);
}
bootstrap();
