import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusModule } from '../status/status.module';
import { StatusEntity } from '../status/status.entity';
import { StatusService } from '../status/status.service';
import { TaskEntity } from './task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [StatusModule, TypeOrmModule.forFeature([TaskEntity, StatusEntity])],
  controllers: [TaskController],
  providers: [TaskService, StatusService],
})
export class TaskModule {}
