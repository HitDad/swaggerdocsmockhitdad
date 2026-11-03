import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express } from 'express';
import { AppModule } from '../src/app.module';

let cachedServer: Express;

async function bootstrap(): Promise<Express> {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Football Match Attendance & Voting API')
    .setDescription(
      'Hệ thống RESTful API cho Đội bóng đá gồm 2 Collection: Users và Sessions. Giảng viên test trực tiếp bằng nút "Try it out" và "Execute".',
    )
    .setVersion('1.0')
    .addTag('Sessions (Phiên điểm danh đá bóng)')
    .addTag('Users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Football Match Attendance API Docs',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  SwaggerModule.setup('docs', app, document);

  // Tự động chuyển hướng từ trang chủ '/' sang '/api'
  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/', (req: any, res: any) => {
    res.redirect('/api');
  });

  await app.init();
  return expressApp;
}

export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(req, res);
}
