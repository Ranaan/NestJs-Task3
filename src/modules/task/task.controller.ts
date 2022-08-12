import { ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import {
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get()
  async getAllTasks() {
    return await this.taskService.getAllTasks();
  }
  @Get(':id')
  async getUserTasks(@Param('id', ParseIntPipe) userId: number) {
    return await this.taskService.getUserTasks(userId);
  }
  @Post()
  async addTask(@Body() taskDetails: { title: string; userId: number }) {
    return await this.taskService.addTask(taskDetails);
  }

  @Put(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() title: string,
    @Body() statusId: number,
  ) {
    return await this.taskService.updateTask(id, title, statusId);
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.deleteTask(id);
  }
}
