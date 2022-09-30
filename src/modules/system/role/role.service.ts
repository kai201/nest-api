import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Not, Repository } from 'typeorm';
import { SysRole, CreateRole, UpdateRole } from './role.model';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(SysRole) private roleAccessor: Repository<SysRole>) {}

  async list() {
    return await this.roleAccessor.find({});
  }

  async findOne(roleId: number) {
    return await this.roleAccessor.findOne({ where: { roleId } });
  }

  async create(model: CreateRole) {
    return await this.roleAccessor.save(model);
  }
  async update(model: UpdateRole) {
    return await this.roleAccessor.update(model.roleId, model);
  }

  async remove(idList: number[]) {
    return await this.roleAccessor.delete({ roleId: In(idList) });
  }
}
