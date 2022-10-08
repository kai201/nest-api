export default () => {
  return {
    database: {
      type: 'mysql',
      // host: process.env.MYSQL_HOST || '127.0.0.1',
      // username: process.env.MYSQL_USERNAME || 'root',
      // password: process.env.MYSQL_PASSWORD || '123456',
      // database: process.env.MYSQL_DATABASE || 'sf-admin',

      host: 'i.com',
      username: process.env.MYSQL_USERNAME || 'root',
      // password: process.env.MYSQL_PASSWORD || 'a0b14efb100a083b',
      // database: process.env.MYSQL_DATABASE || 'sys_svc_crm',
      password: process.env.MYSQL_PASSWORD || '123456',
      database: process.env.MYSQL_DATABASE || 'sys_crm',
      port: process.env.MYSQL_PORT || 3306,
      synchronize: false,
      logging: ['all'],
    },
  };
};
export const nacos = {
  config: {
    enabled: true,
    server: '10.0.6.110:8848',
    namespace: '625c56f8-51b4-42cb-b089-54487ca5a65e',
    group: 'DEFAULT_GROUP',
    dataId: 'applet',
  },
  discovery: {
    enabled: true,
    server: '10.0.6.110:8848',
    namespace: '625c56f8-51b4-42cb-b089-54487ca5a65e',
    serviceList: {
      cms: {
        serviceName: 'service-cms',
        subscribe: false,
      },
    },
  },
};
