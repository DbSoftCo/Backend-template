import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import * as compression from 'compression';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(compression());
  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('BdSoft backend template')
    .setDescription('Facu se la come')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme();
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'swagger/json',
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.NORD_DARK),
    customSiteTitle: 'Documentation',
  });

  await app.listen(3000);
}
bootstrap();
