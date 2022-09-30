import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class SessionUser {}

export class R<T = any> {
  constructor(success = true, message?: string, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  @ApiProperty({ description: '是否成功' })
  success: boolean;
  @ApiProperty({ description: '消息' })
  message: string;
  @ApiProperty({ description: '数据' })
  data?: T;

  static success<T>(model?: T) {
    return new R<T>(true, null, model);
  }

  static fail(message: string) {
    return new R(false, message);
  }
}

export class QueryPagination {
  @ApiProperty({ required: false, description: '数量' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  pageSize?: number;

  @ApiProperty({ required: false, description: '页码' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  current?: number;
}
