import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../shared/setup/database/schema/user.entity';
import { USER_REPOSITORY } from '../../shared/setup/database/postgres/repository.tokens';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const exists = await this.userRepo.findOne({
      where: [{ email: dto.email }, { userName: dto.userName }],
    });

    if (exists) {
      throw new ConflictException('Email or username already in use');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      userName: dto.userName,
      email: dto.email,
      password: hashed,
      ...(dto.roleId && { roleId: dto.roleId }),
      mobileNumber: dto.mobileNumber ? Number(dto.mobileNumber) : undefined,
    });

    try {
      const saved = await this.userRepo.save(user);
      const { password, ...result } = saved;
      return result;
    } catch {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findByMobile(mobileNumber: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { mobileNumber: Number(mobileNumber) },
    });
  }

  async save(user: User): Promise<User> {
    return this.userRepo.save(user);
  }
}
