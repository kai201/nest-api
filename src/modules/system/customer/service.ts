import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository, FindOptionsWhere, Like, FindOptionsOrder } from 'typeorm';
import { FETCH_LIST_PAGE, FETCH_LIST_PAGESIZE } from 'src/common';
import { Customer, QueryCustomer, CreateCustomer, UpdateCustomer } from './model';
/**
 * sys_customer服务
 */
@Injectable()
export class CustomerService {
  constructor(@InjectRepository(Customer) private accessor: Repository<Customer>) {}

  /**
   * 分页查询
   * @param params
   * @returns 分页数据
   */
  async list(params: QueryCustomer) {
    const { current = FETCH_LIST_PAGE, pageSize = FETCH_LIST_PAGESIZE } = params;
    const skip = (current - 1) * pageSize;
    let where: FindOptionsWhere<Customer> = {};
    // if (!isEmpty(userName)) where = Object.assign(where, { userName: Like(`${userName}%`) });
    // if (!isEmpty(nikeName)) where = Object.assign(where, { nickName: Like(`${nikeName}%`) });
    let orderBy: FindOptionsOrder<Customer> = { createdTime: 'DESC' };
    return await this.accessor.findAndCount({ where, order: orderBy, skip, take: pageSize });
  }

  /**
   * 查询
   * @param {string} customerId
   * @returns 数据
   */
  async findOne(customerId: string) {
    return await this.accessor.findOne({ where: { customerId } });
  }

  /**
   * 创建
   * @param {CreateCustomer} model
   * @returns 数据
   */
  async create(model: CreateCustomer) {
    return await this.accessor.save(model);
  }

  /**
   * 更新
   * @param {UpdateCustomer} model
   * @returns 数据
   */
  async update(model: UpdateCustomer) {
    return await this.accessor.update(model.customerId, model);
  }

  /**
   * 删除
   * @param {string[]} idList
   * @returns 数据
   */
  async remove(idList: string[]) {
    return await this.accessor.delete({ customerId: In(idList) });
  }
}