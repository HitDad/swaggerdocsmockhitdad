import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'Mã định danh duy nhất của thành viên (UUID)',
  })
  id: string;

  @ApiProperty({
    example: 'nguyen_van_a',
    description: 'Tên tài khoản / Mã thành viên CLB',
  })
  username: string;

  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Họ và tên thành viên',
  })
  fullName: string;

  @ApiProperty({
    example: 'member@fc-club.com',
    description: 'Email liên hệ của thành viên',
  })
  email: string;

  @ApiProperty({
    example: 'Hậu vệ',
    description: 'Vị trí hoặc vai trò trong CLB (Tiền đạo, Tiền vệ, Hậu vệ, CĐV...)',
    default: 'Thành viên',
  })
  role: string;

  @ApiProperty({
    description: 'Thời điểm tham gia CLB',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Thời điểm cập nhật thông tin gần nhất',
  })
  updatedAt: Date;
}
