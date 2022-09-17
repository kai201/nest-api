import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

export class SessionUser {}

export class R {
  constructor(success = true, message?: string) {
    this.success = success;
    this.message = message;
  }

  @ApiProperty({ description: '是否成功' })
  success: boolean;
  @ApiProperty({ description: '消息' })
  message: string;

  static success<T>(model?: T) {
    if (!model) return new R(true, null);

    return new RData<T>(true, null, model);
  }

  static fail(message: string) {
    return new R(false, message);
  }
}

export class RData<T> extends R {
  constructor(success = true, message?: string, data?: T) {
    super(success, message);
    this.data = data;
  }

  @ApiProperty({ description: '数据' })
  data: T;
}
