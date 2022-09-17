import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsIn, IsInt, IsMobilePhone, IsOptional, IsString, Min, MinLength } from 'class-validator';

import SysRole from 'src/model/sys-role.model';

export class CreateRole {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: '角色名称' })
  roleName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '角色权限字符串' })
  roleKey: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ description: '显示顺序' })
  roleSort: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ description: '数据范围（1：全部数据权限;2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）' })
  dataScope: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ description: '角色状态（0正常;1停用）' })
  status: number;
}

export class UpdateRole extends CreateRole {
  @ApiProperty({ description: '角色ID' })
  @IsInt()
  @Min(0)
  roleId: number;
}
