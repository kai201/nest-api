import { Global, Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { RedisModule } from '@nestjs-modules/ioredis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { NacosModule, NamingService, ConfigService } from './nacos';
import { nacos } from 'src/config/configuration';
import { WxModule } from './wx/wx.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [NacosModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
        // ...configuration().database,
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
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    RedisModule.forRoot({ config: { host: 'i.com', db: 1 } }),
    NacosModule.forRoot(nacos, true),
    WxModule.forRoot({
      wxdev: {
        appId: 'wx8812aa7d9da85c30',
        appScrect: '22a9223107f4ffb3532db5ae59f304aa',
        token: 'r7sZSCOALahJDfSCz0IHBM',
        encryptMessage: true,
        encodingAesKey: 'r7sZSCOALahJDfSCz0IHBMQT9Bj6jXg7DsXCVg5KhJs',
      },
    }),
  ],
  exports: [HttpModule, NacosModule, TypeOrmModule, RedisModule],
})
export class SharedModule {
  constructor(httpService: HttpService, namingService: NamingService) {
    httpService.axiosRef.interceptors.request.use((config) => {
      config.url = namingService.toUrl(config.url);
      console.log(config.url);
      return config;
    });
  }
}
