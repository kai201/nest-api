import { Module, DynamicModule, Logger } from '@nestjs/common';

import { INacosOptions } from './nacos.interface';
import { NamingService } from './naming.service';
import { ConfigService } from './config.service';

@Module({})
export class NacosModule {
  static forRoot(opt: INacosOptions, global = true): DynamicModule {
    return {
      global,
      module: NacosModule,
      providers: [
        {
          provide: ConfigService,
          async useFactory() {
            const svc = new ConfigService(opt.config);
            await svc.ready();
            return svc;
          },
        },
        {
          provide: NamingService,
          useFactory() {
            return new NamingService(opt.discovery);
          },
        },
      ],
      exports: [NamingService, ConfigService],
    };
  }
}
