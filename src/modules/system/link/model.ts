import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNumber, IsDate, IsIn, IsInt, IsMobilePhone, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { QueryPagination } from 'src/common';
/**
 * 
 * 推广短链
 * sys_link
 */
@Entity({ name: 'sys_link' })
export class SysLink {
          
  /**
   * 链接编号
   */
  @PrimaryGeneratedColumn({ name: 'link_id' })
  @ApiProperty({ description: '链接编号' })
  linkId: number;
  
  /**
   * 名称
   */
  @Column({ name: 'link_name', nullable: false })
  @ApiProperty({ description: '名称' })
  @IsString()
  linkName: string;
  
  /**
   * 链接类型
   */
  @Column({ name: 'link_type', nullable: false })
  @ApiProperty({ description: '链接类型' })
  @IsInt()
  linkType: number;
  
  /**
   * 目标地址
   */
  @Column({ name: 'target_url', nullable: false })
  @ApiProperty({ description: '目标地址' })
  @IsString()
  targetUrl: string;
  
  /**
   * 租户号
   */
  @Column({ name: 'tenant_id', nullable: true })
  @ApiProperty({ description: '租户号' })
  tenantId: number;
  
  /**
   * 乐观锁
   */
  @Column({ name: 'revision', nullable: true })
  @ApiProperty({ description: '乐观锁' })
  revision: number;
  
  /**
   * 创建人
   */
  @Column({ name: 'created_by', nullable: true })
  @ApiProperty({ description: '创建人' })
  createdBy: number;
  
  /**
   * 创建时间
   */
  @Column({ name: 'created_time', nullable: true })
  @ApiProperty({ description: '创建时间' })
  createdTime: Date;
  
  /**
   * 更新人
   */
  @Column({ name: 'updated_by', nullable: true })
  @ApiProperty({ description: '更新人' })
  updatedBy: number;
  
  /**
   * 更新时间
   */
  @Column({ name: 'updated_time', nullable: true })
  @ApiProperty({ description: '更新时间' })
  updatedTime: Date;
  
}

// 排除COPY [ 'linkId','linkName','linkType','targetUrl','tenantId','revision','createdBy','createdTime','updatedBy','updatedTime', ]

/**
 * 查询推广短链
 * sys_link
 */
export class QuerySysLink extends QueryPagination {}

/**
 * 创建推广短链
 * sys_link
 */
export class CreateSysLink extends PickType(SysLink, ['linkName','linkType','targetUrl']){
}

/**
 * 更新推广短链
 * sys_link
 */
export class UpdateSysLink {
  @ApiProperty({ description: '链接编号' })
  linkId: number;
}