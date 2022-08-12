import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { StatusEntity } from '../status/status.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(StatusEntity)
    private stateRepository: Repository<StatusEntity>,
  ) {}
  async getAllTasks() {
    return await this.taskRepository.find({ relations: { statusId: true } });
  }
  async getUserTasks(userId: number) {
    return await this.taskRepository.find({
      where: { userId },
      relations: { statusId: true },
    });
  }

  async addTask(task: { title: string; userId: number }) {
    const newState = this.stateRepository.create();
    await this.stateRepository.save(newState);
    const newTask = this.taskRepository.create({
      userId: task.userId,
      title: task.title,
      statusId: newState.id,
    });
    await this.taskRepository.save(newTask);
    return newTask;
  }

  async updateTask(id: number, title: string, statusId: number) {
    return await this.taskRepository.update(id, { title, statusId });
  }
  async deleteTask(id: number) {
    return await this.taskRepository.delete(id);
  }
}
