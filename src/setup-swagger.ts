import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('nest api')
    .setDescription('swagger.desc')
    .setLicense('MIT', 'https://github.com/kai201')
    // JWT鉴权
    // .addSecurity(ADMIN_PREFIX, {
    //   description: '后台管理接口授权',
    //   type: 'apiKey',
    //   in: 'header',
    //   name: 'Authorization',
    // })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/api', app, document);
}
