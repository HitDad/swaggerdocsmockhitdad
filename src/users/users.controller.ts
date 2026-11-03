import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Thêm thành viên mới vào CLB',
    description: 'Tạo hồ sơ thành viên mới trong câu lạc bộ bóng đá (không cần mật khẩu hay xác thực).',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Thành viên được thêm thành công.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Username hoặc Email đã tồn tại.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Xem danh sách toàn bộ thành viên CLB',
    description: 'Lấy toàn bộ danh sách thành viên bóng đá để giảng viên kiểm tra trực tiếp.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách thành viên.',
    type: [User],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Xem chi tiết một thành viên theo ID',
    description: 'Trả về thông tin chi tiết của một thành viên CLB.',
  })
  @ApiParam({
    name: 'id',
    description: 'Mã UUID của thành viên',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Thông tin thành viên.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy thành viên.',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Cập nhật thông tin thành viên',
    description: 'Cập nhật họ tên, vai trò hoặc email của thành viên.',
  })
  @ApiParam({
    name: 'id',
    description: 'Mã UUID của thành viên',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cập nhật thành công.',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Xóa thành viên khỏi CLB',
    description: 'Xóa một thành viên theo ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Mã UUID của thành viên cần xóa',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Xóa thành công.',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
