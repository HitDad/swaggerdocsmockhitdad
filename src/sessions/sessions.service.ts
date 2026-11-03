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
      clubName: createSessionDto.clubName || 'CLB Bóng đá',
      description: createSessionDto.description || '',
      candidates: createSessionDto.candidates || 'Cầu thủ A, Cầu thủ B',
      voteCount: 0,
      status: 'OPEN',
    });
    return await this.sessionRepository.save(session);
  }

  // 3. Xóa session
  async remove(id: string): Promise<{ message: string; deletedId: string }> {
    const session = await this.sessionRepository.findOne({ where: { id } });
    if (!session) {
      throw new NotFoundException(`Không tìm thấy phiên bình chọn với ID: ${id}`);
    }
    await this.sessionRepository.remove(session);
    return {
      message: 'Xóa phiên bình chọn thành công',
      deletedId: id,
    };
  }

  // 4. Vote cho 1 session
  async vote(id: string, voteSessionDto?: VoteSessionDto): Promise<{
    message: string;
    session: Session;
    votedCandidate?: string;
  }> {
    const session = await this.sessionRepository.findOne({ where: { id } });
    if (!session) {
      throw new NotFoundException(`Không tìm thấy phiên bình chọn với ID: ${id}`);
    }

    if (session.status !== 'OPEN') {
      throw new BadRequestException('Phiên bình chọn này đã kết thúc, không thể vote nữa');
    }

    session.voteCount += 1;
    const updatedSession = await this.sessionRepository.save(session);

    return {
      message: `Đã bình chọn thành công cho phiên "${session.title}"! Tổng lượt vote hiện tại: ${updatedSession.voteCount}`,
      session: updatedSession,
      votedCandidate: voteSessionDto?.candidateName || 'Ứng viên hợp lệ',
    };
  }

  // Khởi tạo dữ liệu mẫu cho CLB bóng đá
  async seedDefaultData() {
    const count = await this.sessionRepository.count();
    if (count === 0) {
      const demoSessions = [
        {
          title: 'Bình chọn Cầu thủ xuất sắc nhất tháng 10',
          clubName: 'Hà Nội FC',
          description: 'Bình chọn dành cho các thành viên và cổ động viên cho danh hiệu cầu thủ xuất sắc nhất.',
          candidates: 'Nguyễn Quang Hải, Nguyễn Văn Quyết, Đỗ Hùng Dũng',
          voteCount: 15,
          status: 'OPEN',
        },
        {
          title: 'Bình chọn Bàn thắng đẹp nhất vòng đấu',
          clubName: 'Hà Nội FC',
          description: 'Bàn thắng sút xa từ ngoài vòng cấm hay pha phối hợp đồng đội ăn ý?',
          candidates: 'Bàn thắng phút 34 (Quang Hải), Bàn thắng phút 78 (Văn Quyết)',
          voteCount: 8,
          status: 'OPEN',
        },
        {
          title: 'Bình chọn Đội hình ra sân trận Derby sắp tới',
          clubName: 'Hà Nội FC',
          description: 'Ý kiến CĐV về sơ đồ chiến thuật 4-3-3 hay 3-5-2',
          candidates: 'Sơ đồ 4-3-3 tấn công, Sơ đồ 3-5-2 kiểm soát bóng',
          voteCount: 22,
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
