import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';

let cachedHandler: any;

const SWAGGER_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
      'Hệ thống RESTful API cho Đội bóng đá gồm 2 Collection: Users (Danh sách thành viên) và Sessions (Phiên điểm danh bình chọn CÓ THAM GIA ĐÁ BÓNG hay KHÔNG). Không yêu cầu token/đăng nhập, giảng viên có thể test trực tiếp bằng nút "Try it out" và "Execute".',
    )
    .setVersion('1.0')
    .addTag(
      'Sessions (Phiên điểm danh đá bóng)',
      '4 API: xem danh sách, tạo phiên điểm danh, xóa phiên, và vote tham gia/báo vắng',
    )
    .addTag('Users', 'API quản lý danh sách thành viên trong đội bóng')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerOptions = {
    customSiteTitle: 'Football Match Attendance API Docs',
    customCssUrl: `${SWAGGER_CDN}/swagger-ui.min.css`,
    customJs: [
      `${SWAGGER_CDN}/swagger-ui-bundle.js`,
      `${SWAGGER_CDN}/swagger-ui-standalone-preset.js`,
    ],
  };

  SwaggerModule.setup('api', app, document, swaggerOptions);
  SwaggerModule.setup('docs', app, document, swaggerOptions);

  await app.init();
  return app.getHttpAdapter().getInstance();
}

export default async function handler(req: any, res: any) {
  if (!cachedHandler) {
    cachedHandler = await bootstrap();
  }
  return cachedHandler(req, res);
}
