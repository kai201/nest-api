import { Inject, Injectable, Logger } from '@nestjs/common';
import { NacosConfigClient } from 'nacos';
import { IConfig } from './nacos.interface';

declare type ExcludeUndefinedIf<ExcludeUndefined extends boolean, T> = ExcludeUndefined extends true
  ? Exclude<T, undefined>
  : T | undefined;

declare type KeyOf<T> = keyof T extends never ? string : keyof T;

@Injectable()
export class ConfigService<K = Record<string, unknown>, WasValidated extends boolean = false> {
  private logger = new Logger('[nacos-config]');
  private conn: NacosConfigClient;

  constructor(private opt: IConfig) {
    const { accessKey, secretKey, server } = opt;
    this.conn = new NacosConfigClient({ serverAddr: server, accessKey, secretKey });
  }

  async ready() {
    await this.conn.getConfig(this.opt.dataId, this.opt.group);
  }

  get<T = any>(propertyPath: KeyOf<K>): ExcludeUndefinedIf<WasValidated, T> {
    throw Error();
  }
}
