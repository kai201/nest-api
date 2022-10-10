import { Inject, Injectable, Logger, OnApplicationBootstrap, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { get, differenceWith, isEqual, isEmpty } from 'lodash';
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
  private backup = {};

  constructor(private opt: IConfig) {
    const { accessKey = '', secretKey = '', server, namespace } = this.opt;
    // this.logger.log(opt);
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
    console.log(this.data);
    this.conn.subscribe({ dataId, group }, (conf: any) => {
      this.backup = this.data;
      this.data = load(conf);

      console.log('subscribe', differenceWith([this.backup], [this.data], isEqual));
    });
  }

  get<T = any>(propertyPath: KeyOf<K>): T {
    const processValue = get(this.data, propertyPath);
    return processValue as unknown as T;
  }
  watch<T extends any>(path: string, callback: (data: T) => void): void {}
}
