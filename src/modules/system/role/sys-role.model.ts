import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

/**
 * 角色
 */
@Entity({ name: 'sys_role' })
export default class SysRole {
  @PrimaryGeneratedColumn({ name: 'role_id' })
  @ApiProperty({ description: '角色ID' })
  roleId: number;

  @Column({ name: 'role_name', nullable: false })
  @ApiProperty({ description: '角色名称' })
  roleName: string;

  @Column({ name: 'role_key', nullable: false })
  @ApiProperty({ description: '角色权限字符串' })
  roleKey: string;

  @Column({ name: 'role_sort', nullable: false })
  @ApiProperty({ description: '显示顺序' })
  roleSort: number;

  @Column({ name: 'data_scope', nullable: false })
  @ApiProperty({ description: '数据范围（1：全部数据权限;2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）' })
  dataScope: number;

  @Column({ name: 'status', nullable: false })
  @ApiProperty({ description: '角色状态（0正常;1停用）' })
  status: number;

  @Column({ name: 'del_flag', nullable: false })
  @ApiProperty({ description: '删除标志（0代表存在;2代表删除）' })
  delFlag: number;

  @Column({ name: 'create_by', nullable: true })
  @ApiProperty({ description: '创建者' })
  createBy: number;

  @Column({ name: 'create_time', nullable: true })
  @ApiProperty({ description: '创建时间' })
  createTime: Date;

  @Column({ name: 'update_by', nullable: true })
  @ApiProperty({ description: '更新者' })
  updateBy: number;

  @Column({ name: 'update_time', nullable: true })
  @ApiProperty({ description: '更新时间' })
  updateTime: Date;

  @Column({ name: 'remark', nullable: true })
  @ApiProperty({ description: '备注' })
  remark: string;
}
