import { Inject, Injectable, Logger, OnApplicationBootstrap, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { get, has, set, isEmpty } from 'lodash';
import { load } from 'js-yaml';
import { NacosConfigClient } from 'nacos';
import { IConfig } from './nacos.interface';

declare type KeyOf<T> = keyof T extends never ? string : keyof T;

@Injectable()
export class ConfigService<K = Record<string, unknown>, WasValidated extends boolean = false>
  implements OnModuleDestroy
{
  private logger = new Logger('[nacos-config]');
  private conn: NacosConfigClient;
  private data = {};

  constructor(private opt: IConfig) {
    const { accessKey = '', secretKey = '', server, namespace } = this.opt;
    this.conn = new NacosConfigClient({ serverAddr: server, namespace, accessKey, secretKey });
  }

  onModuleDestroy() {
    this.conn.close();
  }

  async ready() {
    const { dataId, group } = this.opt;
    await this.conn.getConfig(dataId, group).then((conf) => {
      if (!isEmpty(conf)) this.data = Object.assign(this.data, load(conf));
    });
  }

  get<T = any>(propertyPath: KeyOf<K>): T {
    const processValue = get(this.data, propertyPath);
    // console.log(propertyPath, processValue);
    return processValue as unknown as T;
  }
}
