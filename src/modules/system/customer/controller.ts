import { Body, Controller, Get, Param, Post, Query, ParseArrayOptions, ParseArrayPipe } from '@nestjs/common';
import { ApiOperation, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { R, ApiResResponse } from 'src/common';
import { Customer, QueryCustomer, CreateCustomer, UpdateCustomer } from './model';
import { CustomerService } from './service';
/**
 * 客户管理
 * sys_customer
 * customer
 */
@ApiTags('Customer')
@ApiExtraModels(Customer)
@Controller('customer')
export class CustomerController {

 constructor(private service: CustomerService) {}

  @Get()
  @ApiOperation({ summary: '获取用户列表' })
  @ApiResResponse(Customer, true)
  async list(@Query() params: QueryCustomer): Promise<R> {
    const [result, total] = await this.service.list(params);
    return R.success(result, total);
  }
  @Get(':id')
  @ApiOperation({ summary: '获取用户信息' })
  @ApiResResponse(Customer)
  async find(@Param('id') customerId: string): Promise<R> {
    const result = await this.service.findOne(customerId);
    return R.success(result);
  }
  @Post('create')
  @ApiOperation({ summary: '创建用户信息' })
  @ApiResResponse()
  async create(@Body() model: CreateCustomer): Promise<R> {
    await this.service.create(model);
    return R.success();
  }
  @Post('update')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResResponse()
  async update(@Body() model: UpdateCustomer): Promise<R> {
    await this.service.update(model);
    return R.success();
  }
  @Post('remove')
  @ApiOperation({ summary: '删除用户' })
  @ApiResResponse()
  async remove(@Query('idList', new ParseArrayPipe({ items: String })) idList: string[]): Promise<R> {
    await this.service.remove(idList);
    return R.success();
  }
}