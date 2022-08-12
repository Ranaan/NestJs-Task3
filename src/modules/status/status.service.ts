import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEntity } from './status.entity';
import { Repository } from 'typeorm';
@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(StatusEntity)
    private stateRepository: Repository<StatusEntity>,
  ) {}
  async getAll() {
    return await this.stateRepository.find();
  }
  async getOne(id: number) {
    return await this.stateRepository.find({ where: { id } });
  }
}
