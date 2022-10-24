export class AccessToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expiredTime: number;
  json: string;

  constructor() {}

  static new(json: string, tokenType: AccessTokenType = AccessTokenType.NORMAL_TOKEN): AccessToken {
    let accessToken = new AccessToken();
    accessToken.json = json;

    let at = JSON.parse(json);
    if (tokenType === AccessTokenType.NORMAL_TOKEN) {
      accessToken.accessToken = at.access_token;
    } else if (tokenType === AccessTokenType.PROVIDER_TOKEN) {
      accessToken.accessToken = at.provider_access_token;
    } else if (tokenType === AccessTokenType.SUITE_TOKEN) {
      accessToken.accessToken = at.suite_access_token;
    } else if (tokenType === AccessTokenType.COMPONENT_TOKEN) {
      accessToken.accessToken = at.component_access_token;
    } else if (tokenType === AccessTokenType.AUTHORIZER_TOKEN) {
      accessToken.accessToken = at.authorizer_access_token;
      accessToken.refreshToken = at.authorizer_refresh_token;
    }

    accessToken.expiresIn = at.expires_in;

    if (accessToken.expiresIn) {
      accessToken.expiresIn = new Date().getTime() + (accessToken.expiresIn - 9) * 1000;
    }
    // 从缓存读取时还原
    if (at.expiredTime) {
      accessToken.expiredTime = at.expired_time;
    }

    return accessToken;
  }

  public isAvailable(): boolean {
    if (this.expiredTime == null) return false;
    if (this.expiredTime < new Date().getTime()) return false;
    return this.accessToken != null;
  }
}

export class AuthAccessToken extends AccessToken {
  // 开发者ID
  // wxeb1ad16c29ae0d8c
  appId: string;
}
/**
 * AccessToken 类型
 */
export enum AccessTokenType {
  /**
   * 企业微信第三方应用凭证
   */
  SUITE_TOKEN = 'suite_token',
  /**
   * 企业微信服务商凭证
   */
  PROVIDER_TOKEN = 'provider_token',
  /**
   * 普通接口凭证(适用于微信公众号、企业微信、小程序、小游戏)
   */
  NORMAL_TOKEN = 'normal_token',
  /**
   * 微信开放平台凭证
   */
  COMPONENT_TOKEN = 'component_access_token',
  /**
   * 微信开放平台第三方应用凭证
   */
  AUTHORIZER_TOKEN = 'authorizer_token',
}
