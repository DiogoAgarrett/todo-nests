import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
}

export class Task {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ enum: TaskStatus })
  status: TaskStatus;

  @ApiProperty()
  createdAt: Date;
}
