import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../tasks.enum';

export class GetTaskFilterDto {
  @ApiPropertyOptional({ enum: TaskStatus, description: 'Filter by status' })
  status?: TaskStatus;

  @ApiPropertyOptional({ description: 'Filter by search' })
  search?: string;
}
