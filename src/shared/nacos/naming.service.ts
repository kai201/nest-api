import { Inject, Injectable, Optional, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { NacosNamingClient } from 'nacos';
import { IDiscovery } from './nacos.interface';

export class NamingService implements OnModuleInit, OnModuleDestroy {
  private logger = new Logger('[nacos-naming]');
  private _svcMap = new Map<string, any>();

  private conn: NacosNamingClient;

  constructor(private opt: IDiscovery) {
    if (!opt.enabled) return;

    this.conn = new NacosNamingClient({ logger: console, serverList: [opt.server], namespace: opt.namespace });
  }

  onModuleDestroy() {
    // this.conn.deregisterInstance()
    this.conn['close']();
  }
  async onModuleInit() {
    if (!this.conn) return;

    await this.conn.ready();

    // let host = await this.conn.getAllInstances('service-mms', null, null, false);

    // this.logger.log(host);
    // this.conn.registerInstance()
  }
}
