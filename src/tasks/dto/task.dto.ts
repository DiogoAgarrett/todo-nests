import { ApiProperty } from '@nestjs/swagger';
import { Task, TaskStatus } from '../task.entity';

export class TaskDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty({ enum: TaskStatus })
  status: TaskStatus;
  constructor(task: Task) {
    this.name = task.name;
    this.description = task.description;
    this.status = task.status;
  }
}
