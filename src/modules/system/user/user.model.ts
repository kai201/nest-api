import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsEnum, IsIn, IsInt, IsMobilePhone, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { QueryPagination } from 'src/common';
@Entity({ name: 'sys_user' })
export class SysUser {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  @ApiProperty({ description: '用户编号' })
  userId: number;

  @Column({ name: 'prv_id', nullable: true })
  @ApiProperty({ description: '上级' })
  prvId: number;

  @Column({ name: 'nick_name', nullable: false })
  @ApiProperty({ description: '用户昵称' })
  nickName: string;

  @Column({ name: 'user_name', nullable: false })
  @ApiProperty({ description: '登录账号' })
  userName: string;

  @Column({ name: 'user_level', nullable: true })
  @ApiProperty({ description: '用户类型（00系统用户）' })
  userLevel: number;

  @Column({ name: 'email', nullable: true })
  @ApiProperty({ description: '用户邮箱' })
  email: string;

  @Column({ name: 'phone_number', nullable: true })
  @ApiProperty({ description: '手机号码' })
  phoneNumber: string;

  @Column({ name: 'gender', nullable: false })
  @ApiProperty({ description: '用户性别（0男;1女 2未知）' })
  gender: number;

  @Column({ name: 'avatar', nullable: true })
  @ApiProperty({ description: '头像路径' })
  avatar: string;

  @Column({ name: 'password', nullable: true })
  @ApiProperty({ description: '密码' })
  password: string;

  @Column({ name: 'salt', nullable: true })
  @ApiProperty({ description: '盐加密' })
  salt: string;

  @Column({ name: 'status', nullable: false })
  @ApiProperty({ description: '帐号状态（0正常;1停用）' })
  status: number;

  @Column({ name: 'del_flag', nullable: false })
  @ApiProperty({ description: '删除标志（0代表存在;2代表删除）' })
  delFlag: boolean;

  @Column({ name: 'login_ip', nullable: true })
  @ApiProperty({ description: '最后登陆IP' })
  loginIp: string;

  @Column({ name: 'login_time', nullable: true })
  @ApiProperty({ description: '最后登陆时间' })
  loginTime: Date;

  @Column({ name: 'create_by', nullable: true })
  @ApiProperty({ description: '创建者' })
  createBy: string;

  @CreateDateColumn({ name: 'create_time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ description: '创建时间' })
  createTime: Date;

  @Column({ name: 'update_by', nullable: true })
  @ApiProperty({ description: '更新者' })
  updateBy: string;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({ description: '更新时间' })
  updateTime: Date;

  @Column({ name: 'remark', nullable: true })
  @ApiProperty({ description: '备注' })
  remark: string;
}

export class QueryUser extends QueryPagination {
  @ApiProperty({ required: false, description: '昵称' })
  @IsOptional()
  nikeName?: string;

  @ApiProperty({ required: false, description: '用户名' })
  @IsOptional()
  userName?: string;
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
