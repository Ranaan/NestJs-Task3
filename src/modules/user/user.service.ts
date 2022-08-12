import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find({
      relations: ['tasks', 'tasks.userId', 'tasks.statusId'],
    });
  }

  async getUserById(id: number) {
    return await this.userRepository.find({
      where: { id },
      relations: ['tasks', 'tasks.userId'],
    });
  }

  async addUser(username: string, password: string) {
    await this.userRepository.insert({
      username,
      password,
      tasks: [],
    });
    return 'User Created';
  }

  async updateUser(id: number, user: { username: string; password: string }) {
    return await this.userRepository.update(id, {
      username: user.username,
      password: user.password,
    });
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }

  async login(user: { username: string; password: string }) {
    const userInfo = await this.userRepository.findOne({
      where: { username: user.username },
    });

    if (!userInfo) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const IsMatchedPassword = await compare(user.password, userInfo.password);
    if (!IsMatchedPassword) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return 'Logged In Successfully';
  }

  async signUp(user: { username: string; password: string }) {
    const hashedPassword = await hash(user.password, 10);
    const newUser = this.userRepository.create({
      username: user.username,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }
}
