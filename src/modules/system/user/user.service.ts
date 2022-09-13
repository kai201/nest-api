import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Not, Repository } from 'typeorm';
import SysUser from 'src/model/user.model';

@Injectable()
export class UserService {
  constructor(@InjectRepository(SysUser) private userAccessor: Repository<SysUser>) {}

  list() {
    return this.userAccessor.find();
  }
}
