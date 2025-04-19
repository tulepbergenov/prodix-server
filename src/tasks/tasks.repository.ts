// tasks.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './tasks.enum';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks({ status, search }: GetTaskFilterDto): Promise<Task[]> {
    const query = this.createQueryBuilder('tasks');

    if (status) {
      query.andWhere('tasks.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'tasks.title LIKE :search OR tasks.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async createTask({ title, description }: CreateTaskDto): Promise<Task> {
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    return this.save(task);
  }
}
