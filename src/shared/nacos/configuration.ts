import _ from 'lodash';
import { Injectable, OnModuleDestroy, OnModuleInit, Logger } from '@nestjs/common';
import { NacosConfigClient, NacosNamingClient } from 'nacos';

import { IOptions } from './nacos.interface';

export const loadConfig = async (options: any) => {
  const { nacos } = options;
  const { dataId, groupName, enable } = nacos;
  const configClient = new NacosConfigClient({ serverAddr: nacos.serverList, namespace: nacos.namespace });

  const configString = await configClient.getConfig(dataId, groupName);

  try {
    return _.merge(options, JSON.stringify(configString || '{}'));
  } catch (error) {}

  return options;
};

@Injectable()
export class NacosService implements OnModuleDestroy, OnModuleInit {
  private namingConnction: NacosNamingClient;

  private configConnction: NacosConfigClient;

  private isReady = false;

  constructor(private readonly opt: IOptions) {
    this.namingConnction = new NacosNamingClient({
      logger: new Logger() as any,
      serverList: [opt.server],
      namespace: opt.namespace,
    });

    this.configConnction = new NacosConfigClient({
      serverAddr: opt.server,
      namespace: opt.namespace,
      accessKey: opt.accessKey,
      secretKey: opt.secretKey,
    });

    this.namingConnction.ready().then(() => {
      this.isReady = true;
    });
  }
  
  onModuleInit() {
    throw new Error('Method not implemented.');
  }

  onModuleDestroy() {
    // this.naming.deregisterInstance()
    throw new Error('Method not implemented.');
  }
}
