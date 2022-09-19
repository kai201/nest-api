import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NacosModule } from './nacos/nacos.module';

import Configuration from 'src/config/configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        type: configService.get<any>('database.type'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        synchronize: configService.get<boolean>('database.synchronize'),
        // logging: configService.get('database.logging') || 'all',
        logging: 'all',
        // 自定义日志
        // logger: new TypeORMLoggerService(configService.get('database.logging'), loggerOptions),
      }),
      inject: [ConfigService],
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    NacosModule.forRoot(
      {
        discovery: {
          enabled: true,
          server: 'i.com:8848',
          namespace: '625c56f8-51b4-42cb-b089-54487ca5a65e',
        },
      },
      true,
    ),
  ],
  exports: [HttpModule, NacosModule, ConfigModule, TypeOrmModule],
})
export class SharedModule {}
