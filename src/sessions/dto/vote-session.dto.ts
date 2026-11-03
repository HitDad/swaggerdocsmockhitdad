import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class VoteSessionDto {
  @ApiPropertyOptional({
    example: true,
    description: 'Bình chọn: true = CÓ THAM GIA ĐÁ BÓNG, false = BÁO VẮNG (Mặc định: true)',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  participate?: boolean;

  @ApiPropertyOptional({
    example: 'Nguyễn Văn A',
    description: 'Tên thành viên tham gia bình chọn (tùy chọn)',
  })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiPropertyOptional({
    example: 'Có mặt đúng giờ, mang áo số 10',
    description: 'Ghi chú thêm (ví dụ: xin đến muộn 15 phút)',
  })
  @IsString()
  @IsOptional()
  note?: string;
}
