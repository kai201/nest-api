import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository, FindOptionsWhere, Like, FindOptionsOrder } from 'typeorm';
import { UpdateUser, CreateUser, QueryUser, SysUser } from './user.model';
import { FETCH_LIST_PAGE, FETCH_LIST_PAGESIZE } from 'src/common';

/**
 * 用户服务
 */
@Injectable()
export class UserService {
  constructor(@InjectRepository(SysUser) private userAccessor: Repository<SysUser>) {}

  /**
   * 分页查询
   * @param params
   * @returns 分页数据
   */
  async list(params: QueryUser) {
    const { current = FETCH_LIST_PAGE, pageSize = FETCH_LIST_PAGESIZE, userName, nikeName } = params;

    const skip = (current - 1) * pageSize;

    let where: FindOptionsWhere<SysUser> = {};

    if (!isEmpty(userName)) where = Object.assign(where, { userName: Like(`${userName}%`) });
    if (!isEmpty(nikeName)) where = Object.assign(where, { nickName: Like(`${nikeName}%`) });

    let orderBy: FindOptionsOrder<SysUser> = { createTime: 'DESC' };

    return await this.userAccessor.findAndCount({ where, order: orderBy, skip, take: pageSize });
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
