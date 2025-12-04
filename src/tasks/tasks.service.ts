import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { v4 as uuidv4 } from 'uuid';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private count = 0;

  findAll(): TaskDto[] {
    return this.tasks.map((t) => this.toDto(t));
  }

  private toDto(task: Task): TaskDto {
    return new TaskDto(task);
  }

  create(createTaskDto: CreateTaskDto): Task {
    const { name, description } = createTaskDto;

    const task: Task = {
      id: uuidv4(),
      code: this.count++,
      name,
      description: description ?? '',
      status: TaskStatus.TODO,
      createdAt: new Date(),
    };

    this.tasks.push(task);
    return task;
  }

  delete(code: number): void {
    const index = this.tasks.findIndex((t) => t.code === code);
    if (index === -1) {
      throw new NotFoundException('Task not found');
    }
    this.tasks.splice(index, 1);
  }

  updateStatus(code: number, updateStatusDto: UpdateStatusDto): Task {
    const task = this.tasks.find((t) => t.code === code);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.status = updateStatusDto.status;
    return task;
  }
}
