import { Inject, Injectable, Logger } from '@nestjs/common';
import { NacosConfigClient } from 'nacos';
import { IConfig } from './nacos.interface';

@Injectable()
export class ConfigService<K = Record<string, unknown>, WasValidated extends boolean = false> {
  private logger = new Logger('[nacos-config]');
  private conn: NacosConfigClient;
  constructor(private opt: IConfig) {}
}
