import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

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
