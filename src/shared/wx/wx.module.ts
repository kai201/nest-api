import { DynamicModule, Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Kits } from './api-kit';
import * as https from 'https';
import { WxModuleAsyncOptions, WxModuleOptions } from './wx.module.interface';
import { OpenWeChat } from './mp/we-chat';

@Module({
  imports: [HttpModule],
})
export class WxModule {
  static forRoot(options?: WxModuleOptions): DynamicModule {
    const providers = [];
    const exports = [];

    if (options.wxdev) {
      providers.push({
        provide: OpenWeChat,
        useFactory: () => new OpenWeChat(options.wxdev),
      });

      exports.push(OpenWeChat);
    }

    return {
      module: WxModule,
      imports: [],
      providers,
      exports,
    };
  }

  static forRootAsync(options: WxModuleAsyncOptions): DynamicModule {
    const providers = [];
    return {
      module: WxModule,
      providers,
      imports: options.imports,
    };
  }

  constructor(httpService: HttpService) {
    Kits.http = {
      httpGet(url: string, options?: any): Promise<any> {
        return httpService.axiosRef.get(url, options);
      },
      httpGetToResponse(url: string, options?: any): Promise<any> {
        return httpService.axiosRef.get(url, options);
      },
      httpPost(url: string, data: string, options?: any): Promise<any> {
        return httpService.axiosRef.post(url, data, options);
      },
      httpPostToResponse(url: string, data: string, options?: any): Promise<any> {
        return httpService.axiosRef.post(url, data, options);
      },
      httpPutToResponse(url: string, data: string, options?: any): Promise<any> {
        return httpService.axiosRef.put(url, data, options);
      },
      httpDeleteToResponse(url: string, options?: any): Promise<any> {
        return httpService.axiosRef.delete(url, options);
      },
      httpPostWithCert(url: string, data: string, certFileContent: Buffer, passphrase: string): Promise<any> {
        let httpsAgent = new https.Agent({ pfx: certFileContent, passphrase });
        return httpService.axiosRef.post(url, data, { httpsAgent });
      },
      upload(url: string, filePath: string, params?: string): Promise<any> {
        throw Error();
      },
      uploadToResponse(url: string, filePath: string, params?: string, options?: any): Promise<any> {
        throw Error();
      },
    };
  }
}
