import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class VoteSessionDto {
  @ApiPropertyOptional({
    example: 'Quang Hải',
    description: 'Tên cầu thủ được bình chọn',
  })
  @IsString()
  @IsOptional()
  candidateName?: string;

  @ApiPropertyOptional({
    example: 'Cổ động viên #12',
    description: 'Tên người thực hiện bình chọn (không bắt buộc)',
  })
  @IsString()
  @IsOptional()
  voterName?: string;
}

