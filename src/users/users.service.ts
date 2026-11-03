import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private readonly filePath = process.env.VERCEL
    ? '/tmp/users.json'
    : path.join(process.cwd(), 'users.json');

  constructor() {
    this.loadFromDisk();
    this.seedDefaultData();
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf8');
        this.users = JSON.parse(raw);
      }
    } catch {
      this.users = [];
    }
  }

  private saveToDisk() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.users, null, 2), 'utf8');
    } catch {
      // Ignore write errors in read-only environments
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing = this.users.find(
      (u) =>
        u.email === createUserDto.email ||
        u.username === createUserDto.username,
    );

    if (existing) {
      if (existing.email === createUserDto.email) {
        throw new ConflictException('Email đã tồn tại trong danh sách thành viên');
      }
      throw new ConflictException('Username đã tồn tại trong danh sách thành viên');
    }

    const now = new Date();
    const user: User = {
      id: randomUUID(),
      username: createUserDto.username,
      fullName: createUserDto.fullName,
      email: createUserDto.email,
      role: createUserDto.role || 'Thành viên',
      createdAt: now,
      updatedAt: now,
    };

    this.users.unshift(user);
    this.saveToDisk();
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`Không tìm thấy thành viên với ID: ${id}`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const emailExists = this.users.find((u) => u.email === updateUserDto.email);
      if (emailExists) {
        throw new ConflictException('Email đã tồn tại');
      }
    }

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const usernameExists = this.users.find(
        (u) => u.username === updateUserDto.username,
      );
      if (usernameExists) {
        throw new ConflictException('Username đã tồn tại');
      }
    }

    Object.assign(user, updateUserDto, { updatedAt: new Date() });
    this.saveToDisk();
    return user;
  }

  async remove(id: string): Promise<{ message: string; deletedId: string }> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`Không tìm thấy thành viên với ID: ${id}`);
    }
    this.users.splice(index, 1);
    this.saveToDisk();
    return {
      message: 'Xóa thành viên thành công',
      deletedId: id,
    };
  }

  seedDefaultData() {
    if (this.users.length === 0) {
      const now = new Date();
      this.users = [
        {
          id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
          username: 'quanghai19',
          fullName: 'Nguyễn Quang Hải',
          email: 'quanghai@fc-club.com',
          role: 'Tiền vệ tấn công',
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
          username: 'vanquyet10',
          fullName: 'Nguyễn Văn Quyết',
          email: 'vanquyet@fc-club.com',
          role: 'Đội trưởng / Tiền đạo',
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
          username: 'hungdung88',
          fullName: 'Đỗ Hùng Dũng',
          email: 'hungdung@fc-club.com',
          role: 'Tiền vệ trung tâm',
          createdAt: now,
          updatedAt: now,
        },
      ];
      this.saveToDisk();
    }
  }
}
