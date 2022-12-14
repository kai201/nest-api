import { Body, Controller, Get, Param, Post, Query, ParseArrayOptions, ParseArrayPipe } from '@nestjs/common';
import { ApiOperation, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { R, ApiResResponse } from 'src/common';

import { UserService } from './user.service';
import { SysUser, UpdateUser, CreateUser, QueryUser } from './user.model';

@ApiTags('SysUser')
@ApiExtraModels(SysUser)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @ApiOperation({ summary: '获取用户列表' })
  @ApiResResponse(SysUser, true)
  async list(@Query() params: QueryUser): Promise<R> {
    const [result, total] = await this.userService.list(params);

    return R.success(result, total);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取用户信息' })
  @ApiResResponse(SysUser)
  async find(@Param('id') userId: number): Promise<R> {
    const result = await this.userService.findOne(userId);

    return R.success(result);
  }

  @Post('create')
  @ApiOperation({ summary: '创建用户信息' })
  @ApiResResponse()
  async create(@Body() model: CreateUser): Promise<R> {
    await this.userService.create(model);

    return R.success();
  }

  @Post('update')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResResponse()
  async update(@Body() model: UpdateUser): Promise<R> {
    await this.userService.update(model);

    return R.success();
  }

  @Post('remove')
  @ApiOperation({ summary: '删除用户' })
  @ApiResResponse()
  async remove(@Query('idList', new ParseArrayPipe({ items: Number })) idList: number[]): Promise<R> {
    await this.userService.remove(idList);

    return R.success();
  }
}
