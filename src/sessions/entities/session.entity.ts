import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('sessions')
export class Session {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Mã định danh duy nhất của phiên bình chọn (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Bình chọn Cầu thủ xuất sắc nhất tháng 10',
    description: 'Tiêu đề của phiên bình chọn',
  })
  @Column()
  title: string;

  @ApiProperty({
    example: 'Hà Nội FC',
    description: 'Tên câu lạc bộ bóng đá',
  })
  @Column({ default: 'FC Football Club' })
  clubName: string;

  @ApiProperty({
    example: 'Bình chọn dành cho các thành viên và cổ động viên xuất sắc trong tháng',
    description: 'Mô tả chi tiết nội dung phiên bình chọn',
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    example: 'Quang Hải, Văn Quyết, Hùng Dũng',
    description: 'Danh sách các ứng viên hoặc hạng mục bình chọn',
  })
  @Column({ default: 'Cầu thủ A, Cầu thủ B, Cầu thủ C' })
  candidates: string;

  @ApiProperty({
    example: 12,
    description: 'Tổng số lượt bình chọn (votes) hiện tại',
    default: 0,
  })
  @Column({ default: 0 })
  voteCount: number;

  @ApiProperty({
    example: 'OPEN',
    description: 'Trạng thái phiên bình chọn (OPEN hoặc CLOSED)',
    default: 'OPEN',
  })
  @Column({ default: 'OPEN' })
  status: string;

  @ApiProperty({
    description: 'Thời điểm tạo phiên bình chọn',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Thời điểm cập nhật gần nhất',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
