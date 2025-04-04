import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Get all tasks',
    type: Task,
    isArray: true,
  })
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    return Object.keys(filterDto).length
      ? this.tasksService.getTasksWithFilters(filterDto)
      : this.tasksService.getTasks();
  }

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiResponse({
    status: 201,
    description: 'Create a task',
    type: Task,
  })
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiResponse({
    status: 200,
    description: 'Get a task by id',
    type: Task,
  })
  getTaskById(@Param('id') id: string): Task | undefined {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a task by id' })
  @ApiResponse({
    status: 200,
    description: 'Delete a task by id',
  })
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  @ApiOperation({ summary: 'Update a task status' })
  @ApiResponse({
    status: 200,
    description: 'Update a task status',
    type: Task,
  })
  updateTaskStatus(
    @Param('id') id: string,
    @Body() { status }: UpdateTaskStatusDto,
  ): Task | undefined {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
