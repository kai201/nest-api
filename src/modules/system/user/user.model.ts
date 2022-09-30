import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsIn, IsInt, IsMobilePhone, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { QueryPagination } from 'src/common';

export class QueryUser extends QueryPagination {
  @ApiProperty({ required: false, description: '关键字' })
  @IsOptional()
  keyword?: string;
}

export class CreateUser {
  @ApiProperty({ description: '上级' })
  @IsInt()
  @Min(0)
  @IsOptional()
  prvId: number;

  @ApiProperty({ description: '用户昵称' })
  @IsString()
  nickName: string;

  @ApiProperty({ description: '登录账号' })
  @IsString()
  userName: string;

  @ApiProperty({ description: '用户类型（00系统用户）' })
  @IsOptional()
  userLevel: number;

  @ApiProperty({ description: '用户邮箱' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ description: '手机号码' })
  @IsOptional()
  @IsMobilePhone()
  phoneNumber: string;

  @ApiProperty({ description: '用户性别（0男;1女 2未知）' })
  @IsOptional()
  @IsIn([0, 1, 2])
  gender: number;

  @ApiProperty({ description: '头像路径' })
  @IsOptional()
  avatar: string;

  @ApiProperty({ description: '帐号状态（0正常;1停用）' })
  @IsOptional()
  @IsIn([0, 1])
  status: number;

  @ApiProperty({ description: '删除标志（0代表存在;2代表删除）' })
  @IsOptional()
  delFlag: boolean;
}

export class UpdateUser extends CreateUser {
  @ApiProperty({ description: '用户编号' })
  @IsInt()
  @Min(0)
  userId: number;

  @ApiProperty({ description: '最后登陆IP' })
  @IsOptional()
  loginIp: string;

  @ApiProperty({ description: '最后登陆时间' })
  @IsOptional()
  loginTime: Date;
}
