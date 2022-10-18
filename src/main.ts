import { NestFactory } from '@nestjs/core';
import { HttpStatus, ValidationPipe, UnprocessableEntityException } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationError } from 'class-validator';
import { flatten } from 'lodash';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import { ApiExceptionFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    bufferLogs: true,
    logger: ['debug'],
  });
  app.enableCors();

  app.useGlobalFilters(new ApiExceptionFilter());

  // 全局验证
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      enableDebugMessages: true, // 开发环境
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(
          flatten(errors.filter((item) => !!item.constraints).map((item) => Object.values(item.constraints))).join(
            '; ',
          ),
        );
      },
    }),
  );

  // swagger
  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
