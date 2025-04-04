import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../tasks.enum';

export class Task {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  status: TaskStatus;
}
