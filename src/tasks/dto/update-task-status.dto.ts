import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../tasks.enum';

export class UpdateTaskStatusDto {
  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
    description: 'The status of the task',
  })
  status: TaskStatus;
}
