import { Global, Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NacosModule, NamingService, ConfigService as CnfService } from './nacos';
import configuration from 'src/config/configuration';

@Global()
@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   load: [Configuration],
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cnfService: CnfService) => ({
        autoLoadEntities: false,
        type: cnfService.get<any>('database.type'),
        host: cnfService.get<string>('database.host'),
        port: cnfService.get<number>('database.port'),
        username: cnfService.get<string>('database.username'),
        password: cnfService.get<string>('database.password'),
        database: cnfService.get<string>('database.database'),
        synchronize: cnfService.get<boolean>('database.synchronize'),
        keepConnectionAlive: true,
        // logging: configService.get('database.logging') || 'all',
        logging: 'all',
        // 自定义日志
        // logger: new TypeORMLoggerService(configService.get('database.logging'), loggerOptions),
      }),
      inject: [CnfService],
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    NacosModule.forRoot(configuration.nacos, true),
  ],
  exports: [HttpModule, NacosModule, TypeOrmModule],
})
export class SharedModule {
  constructor(private httpService: HttpService, namingService: NamingService) {
    httpService.axiosRef.interceptors.request.use((config) => {
      config.url = namingService.toUrl(config.url);
      console.log(config.url);
      return config;
    });
  }
}
