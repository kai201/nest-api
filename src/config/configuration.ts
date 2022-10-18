export const nacos = {
  config: {
    enabled: true,
    server: 'i.com:8848',
    namespace: '625c56f8-51b4-42cb-b089-54487ca5a65e',
    group: 'DEFAULT_GROUP',
    dataId: 'applet',
  },
  discovery: {
    enabled: true,
    server: 'i.com:8848',
    namespace: '625c56f8-51b4-42cb-b089-54487ca5a65e',
    serviceList: {
      cms: {
        serviceName: 'service-cms',
        subscribe: false,
      },
    },
  },
};
