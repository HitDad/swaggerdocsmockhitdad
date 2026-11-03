import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'Mã định danh duy nhất của thành viên (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'nguyen_van_a',
    description: 'Tên tài khoản / Mã thành viên CLB',
  })
  @Column({ unique: true, type: 'varchar' })
  username: string;

  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Họ và tên thành viên',
  })
  @Column({ type: 'varchar' })
  fullName: string;

  @ApiProperty({
    example: 'member@fc-club.com',
    description: 'Email liên hệ của thành viên',
  })
  @Column({ unique: true, type: 'varchar' })
  email: string;

  @ApiProperty({
    example: 'Hậu vệ',
    description: 'Vị trí hoặc vai trò trong CLB (Tiền đạo, Tiền vệ, Hậu vệ, CĐV...)',
    default: 'Thành viên',
  })
  @Column({ default: 'Thành viên', type: 'varchar' })
  role: string;

  @ApiProperty({
    description: 'Thời điểm tham gia CLB',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Thời điểm cập nhật thông tin gần nhất',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
