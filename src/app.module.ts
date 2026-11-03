import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { User } from './users/entities/user.entity';
import { Session } from './sessions/entities/session.entity';
import { UsersService } from './users/users.service';
import { SessionsService } from './sessions/sessions.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      entities: [User, Session],
      synchronize: true,
    }),
    UsersModule,
    SessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
  ) {}

  async onModuleInit() {
    await this.usersService.seedDefaultData();
    await this.sessionsService.seedDefaultData();
  }
}
