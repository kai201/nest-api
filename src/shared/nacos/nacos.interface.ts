export interface IOptions {
  server: string;
  namespace: string;
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
  accessKey?: string;
  secretKey?: string;
  group: string;
  dataId: string;
}

export interface IDiscovery {
  enabled: boolean;
  server: string;
  namespace: string;
  serviceList?: [];
}
