import { WxMessage } from '../wx-message';

export class WxInAuthMpEventMessage extends WxMessage {
  public static CREATE_AUTH: string = 'authorized';
  public static CHANGE_AUTH: string = 'updateauthorized';
  public static CANCEL_AUTH: string = 'unauthorized';

  appId: string;
  createTime: number;
  infoType: string;
  authAppId: string;
  authCode: string;
  authCodeExpiredTime: number;
  preAuthCode: string;

  constructor(appId: string, infoType: string, createTime: number, authAppId: string, authCode?: string, authCodeExpiredTime?: number, preAuthCode?: string) {
    super();
    this.appId = appId;
    this.infoType = infoType;
    this.createTime = createTime;
    this.authAppId = authAppId;
    this.authCode = authCode;
    this.authCodeExpiredTime = authCodeExpiredTime;
    this.preAuthCode = preAuthCode;
  }
}
