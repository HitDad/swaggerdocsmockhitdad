import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (existing) {
      if (existing.email === createUserDto.email) {
        throw new ConflictException('Email đã tồn tại trong danh sách thành viên');
      }
      throw new ConflictException('Username đã tồn tại trong danh sách thành viên');
    }

    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy thành viên với ID: ${id}`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const emailExists = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (emailExists) {
        throw new ConflictException('Email đã tồn tại');
      }
    }

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const usernameExists = await this.userRepository.findOne({
        where: { username: updateUserDto.username },
      });
      if (usernameExists) {
        throw new ConflictException('Username đã tồn tại');
      }
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<{ message: string; deletedId: string }> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return {
      message: 'Xóa thành viên thành công',
      deletedId: id,
    };
  }

  async seedDefaultData() {
    const count = await this.userRepository.count();
    if (count === 0) {
      const demoUsers = [
        {
          username: 'quanghai19',
          fullName: 'Nguyễn Quang Hải',
          email: 'quanghai@fc-club.com',
          role: 'Tiền vệ tấn công',
        },
        {
          username: 'vanquyet10',
          fullName: 'Nguyễn Văn Quyết',
          email: 'vanquyet@fc-club.com',
          role: 'Đội trưởng / Tiền đạo',
        },
        {
          username: 'hungdung88',
          fullName: 'Đỗ Hùng Dũng',
          email: 'hungdung@fc-club.com',
          role: 'Tiền vệ trung tâm',
        },
      ];
      for (const u of demoUsers) {
        const user = this.userRepository.create(u);
        await this.userRepository.save(user);
      }
    }
  }
}
