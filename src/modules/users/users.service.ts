import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../shared/setup/database/schema/user.entity';
import { USER_REPOSITORY } from '../../shared/setup/database/postgres/repository.tokens';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { QueryUsersDto } from './dto/query-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: Repository<User>,
  ) {}

  // ─── Create ──────────────────────────────────────────────────────────

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

  // ─── Find All (paginated + searchable) ───────────────────────────────

  async findAll(
    query: QueryUsersDto,
  ): Promise<{
    data: Omit<User, 'password'>[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page = 1, limit = 10, search, status } = query;
    const skip = (page - 1) * limit;

    const where: any[] = [];

    if (search) {
      where.push(
        {
          userName: ILike(`%${search}%`),
          ...(status && { userStatus: status }),
        },
        { email: ILike(`%${search}%`), ...(status && { userStatus: status }) },
      );
    } else if (status) {
      where.push({ userStatus: status });
    }

    const [users, total] = await this.userRepo.findAndCount({
      where: where.length ? where : undefined,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const data = users.map(({ password, ...rest }) => rest) as Omit<
      User,
      'password'
    >[];

    return { data, total, page, limit };
  }

  // ─── Find One by ID ───────────────────────────────────────────────────

  async findById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    const { password, ...result } = user;
    return result;
  }

  // ─── Find by Mobile ───────────────────────────────────────────────────

  async findByMobile(mobileNumber: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { mobileNumber: Number(mobileNumber) },
    });
  }

  // ─── Update ───────────────────────────────────────────────────────────

  async update(
    id: string,
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    // Check uniqueness conflicts for changed fields
    if (dto.email && dto.email !== user.email) {
      const emailTaken = await this.userRepo.findOne({
        where: { email: dto.email },
      });
      if (emailTaken) throw new ConflictException('Email already in use');
    }

    if (dto.userName && dto.userName !== user.userName) {
      const userNameTaken = await this.userRepo.findOne({
        where: { userName: dto.userName },
      });
      if (userNameTaken) throw new ConflictException('Username already in use');
    }

    // Hash password if being updated
    if (dto.password) {
      (dto as any).password = await bcrypt.hash(dto.password, 10);
    }

    if (dto.mobileNumber !== undefined) {
      (user as any).mobileNumber = dto.mobileNumber
        ? Number(dto.mobileNumber)
        : null;
      delete (dto as any).mobileNumber;
    }

    Object.assign(user, dto);

    const saved = await this.userRepo.save(user);
    const { password, ...result } = saved;
    return result;
  }

  // ─── Update Status ────────────────────────────────────────────────────

  async updateStatus(
    id: string,
    dto: UpdateStatusDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    user.userStatus = dto.userStatus;
    const saved = await this.userRepo.save(user);
    const { password, ...result } = saved;
    return result;
  }

  // ─── Remove ───────────────────────────────────────────────────────────

  async remove(id: string): Promise<{ message: string }> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    await this.userRepo.remove(user);
    return { message: 'User deleted successfully' };
  }

  // ─── Generic Save (used by AuthService) ──────────────────────────────

  async save(user: User): Promise<User> {
    return this.userRepo.save(user);
  }
}
