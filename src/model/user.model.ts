import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'sys_user' })
export default class SysUser {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  @ApiProperty({ description: '用户编号' })
  userId: number;
}
