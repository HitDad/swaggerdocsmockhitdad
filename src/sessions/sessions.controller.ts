import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
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

@ApiTags('Sessions (Phiên bình chọn CLB Bóng đá)')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  // 1. Xem danh sách session
  @Get()
  @ApiOperation({
    summary: '1. Xem danh sách các phiên bình chọn (Sessions)',
    description: 'Trả về toàn bộ danh sách các phiên bình chọn đang có trong CLB bóng đá.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách các phiên bình chọn.',
    type: [Session],
  })
  findAll() {
    return this.sessionsService.findAll();
  }

  // 2. Tạo session mới
  @Post()
  @ApiOperation({
    summary: '2. Tạo phiên bình chọn mới (Session)',
    description: 'Tạo một phiên bình chọn mới cho CLB bóng đá (ví dụ: bầu chọn cầu thủ, bàn thắng...).',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Phiên bình chọn được tạo thành công.',
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
    summary: '3. Xóa phiên bình chọn (Session)',
    description: 'Xóa một phiên bình chọn khỏi hệ thống theo ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Mã UUID của phiên bình chọn cần xóa',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Xóa phiên bình chọn thành công.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy phiên bình chọn.',
  })
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }

  // 4. Vote cho 1 session
  @Post(':id/vote')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '4. Vote cho 1 phiên bình chọn (Session)',
    description: 'Thực hiện bình chọn cho một session (tăng lượt vote, có thể truyền tên cầu thủ hoặc để trống). Giảng viên chỉ cần bấm Execute là vote thành công ngay.',
  })
  @ApiParam({
    name: 'id',
    description: 'Mã UUID của phiên bình chọn cần vote',
  })
  @ApiBody({
    type: VoteSessionDto,
    required: false,
    description: 'Thông tin bình chọn (tùy chọn, không bắt buộc)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Bình chọn thành công và cập nhật số lượt vote mới.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy phiên bình chọn.',
  })
  vote(
    @Param('id') id: string,
    @Body() voteSessionDto?: VoteSessionDto,
  ) {
    return this.sessionsService.vote(id, voteSessionDto);
  }
}
