import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TaskModule } from '../task/task.module';
import { TaskEntity } from '../task/task.entity';
import { TaskService } from '../task/task.service';
import { StatusEntity } from '../status/status.entity';
import { StatusService } from '../status/status.service';

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forFeature([UserEntity, TaskEntity, StatusEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, TaskService, StatusService],
})
export class UserModule {}
