import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository, FindOptionsWhere, Like, FindOptionsOrder } from 'typeorm';
import { FETCH_LIST_PAGE, FETCH_LIST_PAGESIZE } from 'src/common';
import { SysLink, QuerySysLink, CreateSysLink, UpdateSysLink } from './model';
/**
 * 推广短链服务
 */
@Injectable()
export class SysLinkService {
  constructor(@InjectRepository(SysLink) private accessor: Repository<SysLink>) {}

  /**
   * 分页查询
   * @param params
   * @returns 分页数据
   */
  async list(params: QuerySysLink) {
    const { current = FETCH_LIST_PAGE, pageSize = FETCH_LIST_PAGESIZE } = params;
    const skip = (current - 1) * pageSize;
    let where: FindOptionsWhere<SysLink> = {};
    // if (!isEmpty(userName)) where = Object.assign(where, { userName: Like(`${userName}%`) });
    // if (!isEmpty(nikeName)) where = Object.assign(where, { nickName: Like(`${nikeName}%`) });
    let orderBy: FindOptionsOrder<SysLink> = { createdTime: 'DESC' };
    return await this.accessor.findAndCount({ where, order: orderBy, skip, take: pageSize });
  }

  /**
   * 查询
   * @param {number} linkId
   * @returns 数据
   */
  async findOne(linkId: number) {
    return await this.accessor.findOne({ where: { linkId } });
  }

  /**
   * 创建
   * @param {CreateSysLink} model
   * @returns 数据
   */
  async create(model: CreateSysLink) {
    return await this.accessor.save(model);
  }

  /**
   * 更新
   * @param {UpdateSysLink} model
   * @returns 数据
   */
  async update(model: UpdateSysLink) {
    return await this.accessor.update(model.linkId, model);
  }

  /**
   * 删除
   * @param {number[]} idList
   * @returns 数据
   */
  async remove(idList: number[]) {
    return await this.accessor.delete({ linkId: In(idList) });
  }
}