import { Global, Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { RedisModule } from '@nestjs-modules/ioredis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { NacosModule, NamingService, ConfigService } from './nacos';
import configuration, { nacos } from 'src/config/configuration';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [NacosModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
        keepConnectionAlive: true,
        autoLoadEntities: true,
        logging: 'all',
      }),
      dataSourceFactory: async (opt) => {
        const o = new Proxy(opt, {});
        return new DataSource(o);
      },
      inject: [ConfigService],
    }),
    RedisModule.forRoot({ config: { host: '10.0.6.12', db: 1 } }),
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    NacosModule.forRoot(nacos, true),
  ],
  exports: [HttpModule, NacosModule, TypeOrmModule, RedisModule],
})
export class SharedModule {
  constructor(dataSource: DataSource, httpService: HttpService, namingService: NamingService) {
    httpService.axiosRef.interceptors.request.use((config) => {
      config.url = namingService.toUrl(config.url);
      console.log(config.url);
      return config;
    });
    // dataSource.setOptions({ password: '1' });
    // dataSource.connect()
  }
}
