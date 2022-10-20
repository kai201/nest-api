import { Body, Controller, Get, Param, Post, Query, ParseArrayPipe, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { R, ApiResResponse, Permissions, PermissionGuard } from 'src/common';
import { SysLink, QuerySysLink, CreateSysLink, UpdateSysLink } from './model';
import { SysLinkService } from './service';
/**
 *
 * 推广短链
 * sys_link
 */
@ApiTags('SysLink')
@ApiExtraModels(SysLink)
@Controller('link')
@UseGuards(PermissionGuard)
export class SysLinkController {
  constructor(private service: SysLinkService) {}

  @Get()
  @ApiOperation({ summary: '获取用户列表' })
  @ApiResResponse(SysLink, true)
  @Permissions('sys:link:list')
  async list(@Query() params: QuerySysLink): Promise<R> {
    const [result, total] = await this.service.list(params);
    return R.success(result, total);
  }
  @Get(':id')
  @ApiOperation({ summary: '获取用户信息' })
  @ApiResResponse(SysLink)
  @Permissions('sys:link:find')
  async find(@Param('id') linkId: number): Promise<R> {
    const result = await this.service.findOne(linkId);
    return R.success(result);
  }
  @Post('create')
  @ApiOperation({ summary: '创建用户信息' })
  @ApiResResponse()
  @Permissions('sys:link:add')
  async create(@Body() model: CreateSysLink): Promise<R> {
    await this.service.create(model);
    return R.success();
  }
  @Post('update')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResResponse()
  @Permissions('sys:link:edit')
  async update(@Body() model: UpdateSysLink): Promise<R> {
    await this.service.update(model);
    return R.success();
  }
  @Post('remove')
  @ApiOperation({ summary: '删除用户' })
  @ApiResResponse()
  @Permissions('sys:link:remove')
  async remove(@Query('idList', new ParseArrayPipe({ items: Number })) idList: number[]): Promise<R> {
    await this.service.remove(idList);
    return R.success();
  }
}
