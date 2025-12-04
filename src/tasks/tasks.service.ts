import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  findAll(): Task[] {
    return this.tasks;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const { name, description } = createTaskDto;

    const task: Task = {
      id: uuidv4(),
      name,
      description: description ?? '',
      status: TaskStatus.TODO,
      createdAt: new Date(),
    };

    this.tasks.push(task);
    return task;
  }

  delete(id: string): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException('Task not found');
    }
    this.tasks.splice(index, 1);
  }

  updateStatus(id: string, updateStatusDto: UpdateStatusDto): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.status = updateStatusDto.status;
    return task;
  }
}
