import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { VoteSessionDto } from './dto/vote-session.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  // 1. Xem danh sách session
  async findAll(): Promise<Session[]> {
    return await this.sessionRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  // 2. Tạo session mới
  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const session = this.sessionRepository.create({
      title: createSessionDto.title,
      matchDate: createSessionDto.matchDate || '19:30 - Thứ 5 hàng tuần',
      location: createSessionDto.location || 'Sân bóng CLB',
      description: createSessionDto.description || 'Điểm danh quân số tham gia đá bóng',
      participateCount: 0,
      absentCount: 0,
      status: 'OPEN',
    });
    return await this.sessionRepository.save(session);
  }

  // 3. Xóa session
  async remove(id: string): Promise<{ message: string; deletedId: string }> {
    const session = await this.sessionRepository.findOne({ where: { id } });
    if (!session) {
      throw new NotFoundException(`Không tìm thấy phiên điểm danh với ID: ${id}`);
    }
    await this.sessionRepository.remove(session);
    return {
      message: 'Xóa phiên điểm danh thành công',
      deletedId: id,
    };
  }

  // 4. Vote cho 1 session (Bình chọn Có tham gia hay Không tham gia đá bóng)
  async vote(id: string, voteSessionDto?: VoteSessionDto): Promise<{
    message: string;
    session: Session;
    result: string;
  }> {
    const session = await this.sessionRepository.findOne({ where: { id } });
    if (!session) {
      throw new NotFoundException(`Không tìm thấy phiên điểm danh với ID: ${id}`);
    }

    if (session.status !== 'OPEN') {
      throw new BadRequestException('Phiên điểm danh này đã đóng, không thể bình chọn nữa');
    }

    const isParticipating = voteSessionDto?.participate !== false; // mặc định là true
    const memberName = voteSessionDto?.userName || 'Thành viên CLB';

    if (isParticipating) {
      session.participateCount += 1;
    } else {
      session.absentCount += 1;
    }

    const updatedSession = await this.sessionRepository.save(session);
    const voteChoice = isParticipating ? 'CÓ THAM GIA ĐÁ BÓNG' : 'BÁO VẮNG';

    return {
      message: `${memberName} đã bình chọn [${voteChoice}] cho trận "${session.title}" thành công!`,
      session: updatedSession,
      result: `Hiện có: ${updatedSession.participateCount} người tham gia | ${updatedSession.absentCount} người báo vắng`,
    };
  }

  // Khởi tạo sẵn các phiên điểm danh trận đấu mẫu
  async seedDefaultData() {
    const count = await this.sessionRepository.count();
    if (count === 0) {
      const demoSessions = [
        {
          title: 'Điểm danh trận giao hữu tối Thứ 5 tuần này',
          matchDate: '19:30 - Thứ 5, 05/11/2026',
          location: 'Sân bóng cỏ nhân tạo Chùa Láng (Sân số 2)',
          description: 'Trận gặp FC Bạn Hữu. Anh em điểm danh trước 12h trưa để ban cán sự chuẩn bị nước và áo.',
          participateCount: 11,
          absentCount: 2,
          status: 'OPEN',
        },
        {
          title: 'Điểm danh trận đấu giải Ngoại hạng Phủi Chủ Nhật',
          matchDate: '16:00 - Chủ Nhật, 08/11/2026',
          location: 'Sân vận động C500 - Học viện An Ninh',
          description: 'Trận đấu vòng bảng tranh cúp Tứ Hùng. Yêu cầu toàn đội có mặt sớm 30 phút khởi động.',
          participateCount: 14,
          absentCount: 1,
          status: 'OPEN',
        },
        {
          title: 'Điểm danh buổi tập thể lực & chiến thuật thứ 3',
          matchDate: '18:00 - Thứ 3, 10/11/2026',
          location: 'Sân bóng Đại học Y Hà Nội',
          description: 'Tập các bài phối hợp nhóm nhỏ và đá đối kháng nội bộ.',
          participateCount: 9,
          absentCount: 4,
          status: 'OPEN',
        },
      ];

      for (const item of demoSessions) {
        const s = this.sessionRepository.create(item);
        await this.sessionRepository.save(s);
      }
    }
  }
}
