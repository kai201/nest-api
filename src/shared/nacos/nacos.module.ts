import { Module, DynamicModule, Logger } from '@nestjs/common';

import { NacosConfigClient, NacosNamingClient } from 'nacos';

import { INacosOptions } from './nacos.interface';
import { NamingService } from './naming.service';
import { ConfigService } from './config.service';

class Log extends Logger {
  info(message: any, ...args: any) {
    // String.prototype.toString()
    this.log(message, args);
  }
}

@Module({})
export class NacosModule {
  static forRoot(opt: INacosOptions, global = true): DynamicModule {
    // const namingConnction = new NacosNamingClient({
    //   // logger: new Log('nacos') as any,
    //   logger: opt.logger || console,
    //   serverList: [opt.server],
    //   namespace: opt.namespace,
    // });

    // const configConnction = new NacosConfigClient({
    //   serverAddr: opt.server,
    //   namespace: opt.namespace,
    //   accessKey: opt.accessKey,
    //   secretKey: opt.secretKey,
    // });

    return {
      global,
      module: NacosModule,
      providers: [
        // {
        //   provide: ConfigService,
        //   useFactory() {
        //     return new ConfigService(configConnction);
        //   },
        // },
        {
          provide: NamingService,
          useFactory() {
            return new NamingService(opt.discovery);
          },
        },
      ],
      // exports: [NamingService, ConfigService],
    };
  }
}
