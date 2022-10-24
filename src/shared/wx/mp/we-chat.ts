import { format } from 'util';
import { AccessToken, AccessTokenType, AuthAccessToken } from '../access-token';
import { Kits } from '../api-kit';
import { HttpDelegate, ICache, WeChatSession, WxOptions } from '../wx.interface';

const url: string = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s';

export class MPWeChat implements WeChatSession {
  private cache: ICache = Kits.cache;
  private http: HttpDelegate = Kits.http;

  // 开发者ID
  // wxeb1ad16c29ae0d8c
  appId: string;

  // 开发者密码(AppSecret)
  // bba025b2ff83ec5f7e2417b257239124
  appScrect: string;

  ticket: string;

  // 令牌(Token)
  token: string;

  // 消息加解密密钥
  encodingAesKey: string;

  // 消息加解密方式
  encryptMessage: boolean;

  /**
   *  获取 acces_token
   *  1、先从缓存中获取，如果可用就直接返回
   *  2、如果缓存中的已过期就调用刷新接口来获取新的 acces_token
   */
  public async getAccessToken(): Promise<AccessToken> {
    let accessToken: AccessToken | undefined = await this.getAvailableAccessToken();
    if (accessToken) {
      if (Kits.devMode) {
        console.debug('缓存中的 accesstoken');
      }
      return accessToken;
    }
    if (Kits.devMode) {
      console.debug('刷新 accesstoken');
    }
    return await this.refreshAccessToken();
  }

  /**
   *  通过 appId 从缓存中获取 acces_token
   */
  private async getAvailableAccessToken(): Promise<AccessToken | undefined> {
    let result: AccessToken | undefined;
    let accessTokenJson: string = await this.cache.get(this.appId);
    if (accessTokenJson) {
      result = AccessToken.new(accessTokenJson);
    }
    if (result && result.isAvailable()) {
      return result;
    } else {
      return undefined;
    }
  }

  /**
   *  获取新的 acces_token 并设置缓存
   */
  public async refreshAccessToken(): Promise<AccessToken> {
    let u = format(url, this.appId, this.appScrect);
    let data = await this.http.httpGet(u);
    if (data) {
      data = JSON.stringify(data);
      let accessToken: AccessToken = AccessToken.new(data);
      this.cache.set(this.appId, accessToken.json);
      return accessToken;
    } else {
      throw new Error('获取accessToken异常');
    }
  }
}

const getComponentTokenUrl: string = 'https://api.weixin.qq.com/cgi-bin/component/api_component_token';

export class OpenWeChat implements WeChatSession {
  private cache: ICache = Kits.cache;
  private http: HttpDelegate = Kits.http;

  constructor(private options: WxOptions) {}

  public async getAccessToken(): Promise<AccessToken> {
    let accessToken: AccessToken | undefined = await this.getAvailableAccessToken();
    if (accessToken) {
      if (Kits.devMode) {
        console.debug('缓存中的 accesstoken');
      }
      return accessToken;
    }
    if (Kits.devMode) {
      console.debug('刷新 accesstoken');
    }
    return await this.refreshAccessToken();
  }

  public async refreshAccessToken(): Promise<AccessToken> {
    let data = await this.http.httpPost(getComponentTokenUrl, JSON.stringify({ component_appid: this.options.appId, component_appsecret: this.options.appScrect, component_verify_ticket: this.options.ticket }));
    if (data) {
      data = JSON.stringify(data);

      let accessToken: AccessToken = AccessToken.new(data, AccessTokenType.COMPONENT_TOKEN);

      this.cache.set(this.options.appId, accessToken.json);

      return accessToken;
    } else {
      throw new Error('获取 accessToken 异常');
    }
  }

  /**
   * 获取可用的 AccessToken
   * @param apiConfig
   */
  private async getAvailableAccessToken(): Promise<AccessToken | undefined> {
    let result: AccessToken | undefined;

    let accessTokenJson: string = await this.cache.get(this.options.appId);
    if (accessTokenJson) {
      result = AccessToken.new(accessTokenJson, AccessTokenType.COMPONENT_TOKEN);
    }
    if (result && result.isAvailable()) {
      return result;
    } else {
      return undefined;
    }
  }
}

const authUrl: string = 'https://api.weixin.qq.com/cgi-bin/component/api_authorizer_token?component_access_token=%s';

export class OpenAuthWeChat implements WeChatSession {
  constructor(private session: OpenWeChat, private accessToken: AuthAccessToken) {}

  public async getAccessToken(): Promise<AccessToken> {
    let accessToken: AccessToken | undefined = await this.getAvailableAccessToken();
    if (accessToken) {
      if (Kits.devMode) {
        console.debug('缓存中的 accesstoken');
      }
      return accessToken;
    }
    if (Kits.devMode) {
      console.debug('刷新 accesstoken');
    }
    return await this.refreshAccessToken();
  }

  public async refreshAccessToken(): Promise<AccessToken> {
    let url = format(authUrl, this.session.getAccessToken());
    let { appId, refreshToken } = this.accessToken;

    let data = await Kits.http.httpPost(url, JSON.stringify({ component_appid: this.session.appId, authorizer_appid: appId, authorizer_refresh_token: refreshToken }));

    if (data) {
      data = JSON.stringify(data);
      let accessToken = AccessToken.new(data, AccessTokenType.AUTHORIZER_TOKEN);

      this.accessToken = Object.assign(this.accessToken, accessToken);

      Kits.cache.set(this.session.appId.concat('_').concat(appId), data);

      return this.accessToken;
    } else {
      throw new Error('获取 accessToken 异常');
    }
  }

  /**
   * 获取可用的 AccessToken
   * @param apiConfig
   * @param authorizerAppId
   */
  private async getAvailableAccessToken(): Promise<AccessToken | undefined> {
    let result: AccessToken | undefined;
    let accessTokenJson: string = await Kits.cache.get(this.session.appId.concat('_').concat(this.appId));
    if (accessTokenJson) {
      result = AccessToken.new(accessTokenJson, AccessTokenType.AUTHORIZER_TOKEN);
    }
    if (result && result.isAvailable()) {
      return result;
    } else {
      return undefined;
    }
  }
}
