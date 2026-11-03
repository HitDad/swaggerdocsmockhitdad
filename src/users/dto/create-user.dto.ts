import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'nguyen_van_a',
    description: 'Tên định danh thành viên trong CLB (duy nhất)',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Họ và tên thành viên',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'member@fc-club.com',
    description: 'Địa chỉ email thành viên',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    example: 'Tiền đạo',
    description: 'Vai trò hoặc vị trí trong CLB',
  })
  @IsString()
  @IsOptional()
  role?: string;
}
