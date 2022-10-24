import { AccessToken, AccessTokenType, AuthAccessToken } from './access-token';

export interface ICache {
  get(key: string): Promise<any>;
  set(key: string, value: string): Promise<any>;
  remove(key: string): Promise<any>;
}

export interface HttpDelegate {
  httpGet(url: string, options?: any): Promise<any>;
  httpGetToResponse(url: string, options?: any): Promise<any>;
  httpPost(url: string, data: string, options?: any): Promise<any>;
  httpPostToResponse(url: string, data: string, options?: any): Promise<any>;
  httpDeleteToResponse(url: string, options?: any): Promise<any>;
  httpPostWithCert(url: string, data: string, certFileContent: Buffer, passphrase: string): Promise<any>;
  upload(url: string, filePath: string, params?: string): Promise<any>;
  uploadToResponse(url: string, filePath: string, data: string, options?: any): Promise<any>;
  httpPutToResponse(url: string, data: string, options?: any): Promise<any>;
}

export type Service<TData, TParams extends any[]> = (...args: TParams) => Promise<TData>;

export type WxOptions = {
  // 开发者ID
  appId: string;

  // 开发者密码(AppSecret)
  appScrect: string;

  // 消息加解密密钥
  encodingAesKey: string;

  // 消息加解密方式
  encryptMessage: boolean;

  // 令牌(Token)
  token?: string;
  
  ticket?: string;
};

export interface WeChatSession {
  getAccessToken(): Promise<AccessToken>;
  refreshAccessToken(): Promise<AccessToken>;
}

export interface IWeixin {
  find<T extends WeChatSession>(appId: string, tokenType: AccessTokenType): Promise<T>;
  findToken<T extends AuthAccessToken>(appId: string): Promise<T>;
}
