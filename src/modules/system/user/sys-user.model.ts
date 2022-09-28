import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'sys_user' })
export default class SysUser {
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

  @CreateDateColumn({ name: 'create_time' })
  @ApiProperty({ description: '创建时间' })
  createTime: Date;

  @Column({ name: 'update_by', nullable: true })
  @ApiProperty({ description: '更新者' })
  updateBy: string;

  @UpdateDateColumn({ name: 'update_time' })
  @ApiProperty({ description: '更新时间' })
  updateTime: Date;

  @Column({ name: 'remark', nullable: true })
  @ApiProperty({ description: '备注' })
  remark: string;
}
