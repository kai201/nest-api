import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsEnum, IsIn, IsInt, IsMobilePhone, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { QueryPagination } from 'src/common';
/**
 * 客户管理
 * sys_customer
 * customer
 */
@Entity({ name: 'sys_customer' })
export class Customer {
  /**
   * 客户编号
   */
  @PrimaryGeneratedColumn({ name: 'customer_id' })
  @ApiProperty({ description: '客户编号' })
  customerId: string; 

  /**
   * 租户号
   */
  @Column({ name: 'tenant_id', nullable: true })
  @ApiProperty({ description: '租户号' })
  tenantId: string;

  /**
   * 乐观锁
   */
  @Column({ name: 'revision', nullable: true })
  @ApiProperty({ description: '乐观锁' })
  revision: string;

  /**
   * 创建人
   */
  @Column({ name: 'created_by', nullable: true })
  @ApiProperty({ description: '创建人' })
  createdBy: string;

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
  updatedBy: string;

  /**
   * 更新时间
   */
  @Column({ name: 'updated_time', nullable: true })
  @ApiProperty({ description: '更新时间' })
  updatedTime: Date;
}

// 排除COPY [ 'customerId','tenantId','revision','createdBy','createdTime','updatedBy','updatedTime', ]

/**
 * 查询sys_customer
 * customer
 */
export class QueryCustomer extends QueryPagination {}

/**
 * 创建sys_customer
 * customer
 */
export class CreateCustomer extends OmitType(Customer, [
  'customerId',
  'tenantId',
  'revision',
  'createdBy',
  'createdTime',
  'updatedBy',
  'updatedTime',
]) {}

/**
 * 更新sys_customer
 * customer
 */
export class UpdateCustomer {
  @ApiProperty({ description: '客户编号' })
  customerId: string;
}
