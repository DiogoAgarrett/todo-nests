import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiResponse({ status: 200, type: Task, isArray: true })
  findAll(): TaskDto[] {
    return this.tasksService.findAll();
  }

  @Post()
  @ApiResponse({ status: 201, type: Task })
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Delete(':code')
  @ApiResponse({ status: 200 })
  delete(@Param('code') code: number): void {
    this.tasksService.delete(code);
  }

  @Patch(':code/status')
  @ApiResponse({ status: 200, type: Task })
  updateStatus(
    @Param('code') code: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Task {
    return this.tasksService.updateStatus(code, updateStatusDto);
  }
}
