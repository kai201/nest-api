import { NestFactory } from '@nestjs/core';
import { HttpStatus, ValidationPipe, UnprocessableEntityException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { flatten } from 'lodash';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // validate
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
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
