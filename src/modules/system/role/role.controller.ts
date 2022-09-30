import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { R, ApiResResponse } from 'src/common';
import { SysRole, CreateRole, UpdateRole } from './role.model';

import { RoleService } from './role.service';

@ApiTags('SysRole')
@ApiExtraModels(SysRole)
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Get()
  @ApiOperation({ summary: '获取角色列表' })
  @ApiResResponse(SysRole, true)
  async list(): Promise<R> {
    // const result = await this.roleService.list();

    return R.success();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取角色信息' })
  @ApiResResponse(SysRole)
  async find(@Param('id') userId: number): Promise<R> {
    const result = await this.roleService.findOne(userId);

    return R.success(result);
  }

  @Post('create')
  @ApiOperation({ summary: '创建角色信息' })
  @ApiResResponse()
  async create(@Body() model: CreateRole): Promise<R> {
    await this.roleService.create(model);

    return R.success();
  }

  @Post('update')
  @ApiOperation({ summary: '更新角色信息' })
  @ApiResResponse()
  async update(@Body() model: UpdateRole): Promise<R> {
    await this.roleService.update(model);

    return R.success();
  }

  @Post('remove')
  @ApiOperation({ summary: '删除角色' })
  @ApiResResponse()
  async remove(@Query('idList') idList: Array<number>): Promise<R> {
    await this.roleService.remove(idList);

    return R.success();
  }
}
