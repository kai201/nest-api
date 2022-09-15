import { Inject, Injectable, Logger } from '@nestjs/common';
import { NacosConfigClient } from 'nacos';

@Injectable()
export class ConfigService<K = Record<string, unknown>, WasValidated extends boolean = false> {
  private logger = new Logger('[nacos-config]');

  constructor(private conn: NacosConfigClient) {}
}
