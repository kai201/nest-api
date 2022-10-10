export interface IOptions {
  server: string;
  namespace?: string;
  accessKey?: string;
  secretKey?: string;
  logger?: typeof console;
  config?: {
    group: string;
    dataId: string;
    subscribe?: boolean;
    commons?: IConfig[];
  };
}

export interface INacosOptions {
  discovery?: IDiscovery;
  config?: IConfig;
}

export interface IConfig {
  enabled: boolean;
  server: string;
  namespace?: string;
  accessKey?: string;
  secretKey?: string;
  group: string;
  dataId: string;
}

export interface IDiscovery {
  enabled: boolean;
  server: string;
  namespace?: string;
  serviceList?: ServerList;
}

export interface NacosInstance {
  instanceId: string;
  clusterName: string;
  serviceName: string;
  ip: string;
  port: number;
  weight: number;
  ephemeral: boolean;
  enabled: boolean;
  valid: boolean;
  marked: boolean;
  healthy: boolean;
  metadata: any;
}

export interface ServerList {
  [key: string]: {
    serviceName: string; // 服务名称
    groupName?: string; // 默认 DEFAULT_GROUP
    clusters?: string; // 默认 DEFAULT
    subscribe?: boolean; // 是否订阅  默认 true
  };
}
