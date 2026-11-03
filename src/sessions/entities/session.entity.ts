import { ApiProperty } from '@nestjs/swagger';

export class Session {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Mã định danh duy nhất của phiên điểm danh (UUID)',
  })
  id: string;

  @ApiProperty({
    example: 'Điểm danh trận giao hữu tối Thứ 5',
    description: 'Tiêu đề phiên điểm danh trận bóng',
  })
  title: string;

  @ApiProperty({
    example: '19:30 - Thứ 5, ngày 05/11/2026',
    description: 'Thời gian diễn ra trận đấu',
  })
  matchDate: string;

  @ApiProperty({
    example: 'Sân bóng cỏ nhân tạo Chùa Láng',
    description: 'Địa điểm tổ chức trận đấu',
  })
  location: string;

  @ApiProperty({
    example: 'Anh em điểm danh chốt quân số sớm để ban cán sự chuẩn bị áo và nước',
    description: 'Mô tả chi tiết / Ghi chú cho buổi đá bóng',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: 10,
    description: 'Số lượng thành viên bình chọn CÓ THAM GIA',
    default: 0,
  })
  participateCount: number;

  @ApiProperty({
    example: 2,
    description: 'Số lượng thành viên bình chọn BÁO VẮNG (không tham gia)',
    default: 0,
  })
  absentCount: number;

  @ApiProperty({
    example: 'OPEN',
    description: 'Trạng thái phiên điểm danh (OPEN hoặc CLOSED)',
    default: 'OPEN',
  })
  status: string;

  @ApiProperty({
    description: 'Thời điểm tạo phiên',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Thời điểm cập nhật gần nhất',
  })
  updatedAt: Date;
}
