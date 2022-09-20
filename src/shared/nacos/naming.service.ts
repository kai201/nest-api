import { Inject, Injectable, Optional, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { forIn } from 'lodash';
import { NacosNamingClient } from 'nacos';
import { IDiscovery, NacosInstance } from './nacos.interface';
import { Weight } from './nacos.weight';

export class NamingService implements OnModuleInit, OnModuleDestroy {
  private logger = new Logger('[nacos-naming]');
  private _svcMap = new Map<string, Weight>();

  private conn: NacosNamingClient;

  constructor(private opt: IDiscovery) {
    if (!opt.enabled) return;
    this.conn = new NacosNamingClient({ logger: console, serverList: [opt.server], namespace: opt.namespace });
  }

  onModuleDestroy() {
    if (!this.conn) return;

    this.conn['close'] && this.conn['close']();
  }

  async onModuleInit() {
    if (!this.conn) return;

    await this.conn.ready();

    let serviceList = this.opt.serviceList;

    forIn(serviceList, async (v, k) => {
      let { serviceName, groupName, clusters, subscribe } = v;
      let hosts = await this.conn.getAllInstances(serviceName, groupName || 'DEFAULT_GROUP', clusters, subscribe);

      this._svcMap.set(k, new Weight(hosts as any));
    });

    // this.conn.registerInstance()
  }

  toUrl(url: string): string {
    const results = /(?<=:\/\/)[a-zA-Z\.\-_0-9]+(?=\/|$)/.exec(url);

    if (results && results.length) {
      const serviceName = results[0];
      const weight = this._svcMap.get(serviceName);
      const ins = weight.pop();
      return url.replace(serviceName, `${ins.ip}:${ins.port}`);
    }
    return url;
  }
}
