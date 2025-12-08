import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { v4 as uuidv4 } from 'uuid';
import { TaskDto } from './dto/task.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private readonly dataFilePath = path.join(
    __dirname,
    '..',
    '..',
    'data',
    'tasks.json',
  );

  constructor() {
    this.loadFromFile();
  }
  private count = 0;

  private loadFromFile() {
    try {
      if (fs.existsSync(this.dataFilePath)) {
        const raw = fs.readFileSync(this.dataFilePath, 'utf-8');
        this.tasks = JSON.parse(raw) as Task[];
      } else {
        this.tasks = [];
      }
    } catch (error) {
      console.error('Error loading tasks from file:', error);
    }
  }

  private saveToFile() {
    try {
      const dir = path.dirname(this.dataFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(
        this.dataFilePath,
        JSON.stringify(this.tasks, null, 2),
        'utf-8',
      );
    } catch (error) {
      console.error('Error saving tasks to file: ', error);
    }
  }

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
    this.saveToFile();
    return task;
  }

  delete(code: number): void {
    const index = this.tasks.findIndex((t) => t.code === code);
    if (index === -1) {
      throw new NotFoundException('Task not found');
    }
    this.tasks.splice(index, 1);
    this.saveToFile();
  }

  updateStatus(code: number, updateStatusDto: UpdateStatusDto): Task {
    const task = this.tasks.find((t) => t.code == code);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.status = updateStatusDto.status;
    this.saveToFile();
    return task;
  }

  getByStatus(status: TaskStatus): TaskDto[] {
    return this.tasks
      .map((t) => this.toDto(t))
      .filter((task) => task.status === status);
  }
}
