import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({
    example: 'Bình chọn Cầu thủ xuất sắc nhất tháng 10',
    description: 'Tiêu đề phiên bình chọn',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: 'Hà Nội FC',
    description: 'Tên CLB bóng đá tổ chức bình chọn',
    default: 'Hà Nội FC',
  })
  @IsString()
  @IsOptional()
  clubName?: string;

  @ApiPropertyOptional({
    example: 'Bình chọn danh hiệu cầu thủ thi đấu xuất sắc nhất tháng 10 của CLB',
    description: 'Mô tả chi tiết phiên bình chọn',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 'Quang Hải, Văn Quyết, Hùng Dũng',
    description: 'Danh sách các cầu thủ / ứng viên tham gia bình chọn',
  })
  @IsString()
  @IsOptional()
  candidates?: string;
}
