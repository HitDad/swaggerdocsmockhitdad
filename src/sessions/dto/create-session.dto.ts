import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({
    example: 'Trận giao hữu tối Thứ 5 gặp FC Bạn Hữu',
    description: 'Tiêu đề buổi đá bóng cần điểm danh',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: '19:30 - Thứ 5, 05/11/2026',
    description: 'Thời gian thi đấu',
    default: '19:30 - Tối Thứ 5',
  })
  @IsString()
  @IsOptional()
  matchDate?: string;

  @ApiPropertyOptional({
    example: 'Sân bóng cỏ nhân tạo Chùa Láng',
    description: 'Địa điểm sân bóng',
    default: 'Sân bóng CLB',
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    example: 'Điểm danh trước 12h trưa để ban cán sự chuẩn bị nước và chia đội',
    description: 'Ghi chú cho các thành viên CLB',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
