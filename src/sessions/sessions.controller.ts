import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { VoteSessionDto } from './dto/vote-session.dto';
import { Session } from './entities/session.entity';

@ApiTags('Sessions (Phiên điểm danh đá bóng)')
@Controller('sessions')
export class SessionsController {
  constructor(
    @Inject(SessionsService) private readonly sessionsService: SessionsService,
  ) {}

  // 1. Xem danh sách session
  @Get()
  @ApiOperation({
    summary: '1. Xem danh sách các phiên điểm danh đá bóng (Sessions)',
    description: 'Lấy toàn bộ các buổi đá bóng đang mở điểm danh cùng số lượng người tham gia / vắng mặt.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách các phiên điểm danh.',
    type: [Session],
  })
  findAll() {
    return this.sessionsService.findAll();
  }

  // 2. Tạo session mới
  @Post()
  @ApiOperation({
    summary: '2. Tạo phiên điểm danh trận đấu mới (Session)',
    description: 'Tạo một buổi đá bóng mới để các thành viên trong đội vào bình chọn (Có tham gia / Báo vắng).',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Phiên điểm danh được tạo thành công.',
    type: Session,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dữ liệu đầu vào không hợp lệ.',
  })
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  // 3. Xóa session
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '3. Xóa phiên điểm danh (Session)',
    description: 'Xóa một buổi đá bóng / phiên điểm danh theo ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Mã UUID của phiên cần xóa',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Xóa thành công.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy phiên điểm danh.',
  })
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }

  // 4. Vote cho 1 session
  @Post(':id/vote')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '4. Vote cho 1 session (Bình chọn Có tham gia hay Không tham gia đá bóng)',
    description:
      'Thành viên bình chọn: participate = true (CÓ THAM GIA ĐÁ BÓNG) hoặc false (BÁO VẮNG). Giảng viên chỉ cần bấm Execute trực tiếp là hệ thống tự ghi nhận CÓ THAM GIA.',
  })
  @ApiParam({
    name: 'id',
    description: 'Mã UUID của phiên điểm danh trận đấu',
  })
  @ApiBody({
    type: VoteSessionDto,
    required: false,
    description: 'Lựa chọn tham gia (true/false) và thông tin người bình chọn (tùy chọn)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Bình chọn thành công và cập nhật quân số đội bóng.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy phiên điểm danh.',
  })
  vote(
    @Param('id') id: string,
    @Body() voteSessionDto?: VoteSessionDto,
  ) {
    return this.sessionsService.vote(id, voteSessionDto);
  }
}
