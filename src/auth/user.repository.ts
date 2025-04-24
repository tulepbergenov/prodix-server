import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async createUser({ username, password }: AuthCredentialsDto): Promise<void> {
    const user = this.create({ username, password });

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);

    try {
      await this.save(user);
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code === '23505') {
        throw new ConflictException('Username already exists');
      }

      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
