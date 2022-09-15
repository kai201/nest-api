import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Not, Repository } from 'typeorm';
import SysUser from 'src/model/user.model';
import { UpdateUser, CreateUser } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectRepository(SysUser) private userAccessor: Repository<SysUser>) {}

  async list() {
    return await this.userAccessor.find({});
  }

  async findOne(userId: number) {
    return await this.userAccessor.findOne({ where: { userId } });
  }

  async create(model: CreateUser) {
    return await this.userAccessor.save(model);
  }
  async update(model: UpdateUser) {
    return await this.userAccessor.update(model.userId, model);
  }

  async remove(idList: number[]) {
    return await this.userAccessor.delete({ userId: In(idList) });
  }
}
