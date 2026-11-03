import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Bật CORS cho phép gọi API từ mọi nguồn / trình duyệt
  app.enableCors();

  // Tự động validate dữ liệu
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  // Cấu hình Swagger OpenAPI UI
  const config = new DocumentBuilder()
    .setTitle('Football Club Voting API')
    .setDescription(
      'Hệ thống RESTful API cho Câu lạc bộ Bóng đá gồm 2 Collection: Users (Thành viên CLB) và Sessions (Phiên bình chọn). Không yêu cầu token/đăng nhập, giảng viên có thể test trực tiếp bằng nút "Try it out" và "Execute".',
    )
    .setVersion('1.0')
    .addTag('Sessions (Phiên bình chọn CLB Bóng đá)', '4 API quản lý phiên bình chọn: xem, tạo, xóa, và vote')
    .addTag('Users', 'API quản lý danh sách thành viên trong CLB')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Football Club Voting Swagger Docs',
  });
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Server is running at: http://localhost:${port}/api`);
}

void bootstrap();
