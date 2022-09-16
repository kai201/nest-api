import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { R, ApiResResponse } from 'src/common';
import SysRole from 'src/model/sys-role.model';

import { RoleService } from './role.service';

@ApiTags('SysRole')
@ApiExtraModels(SysRole)
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Get()
  @ApiOperation({ summary: '获取用户列表' })
  @ApiResResponse(SysRole, true)
  async list(): Promise<R> {
    // const result = await this.roleService.list();

    return R.success();
  }
}
