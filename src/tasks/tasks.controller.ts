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

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiResponse({ status: 200, type: Task, isArray: true })
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Post()
  @ApiResponse({ status: 201, type: Task })
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  delete(@Param('id') id: string): void {
    this.tasksService.delete(id);
  }

  @Patch(':id/status')
  @ApiResponse({ status: 200, type: Task })
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Task {
    return this.tasksService.updateStatus(id, updateStatusDto);
  }
}
