import { WxMessage } from '../wx-message';

export class WxInVerifyTicketMessage extends WxMessage {
  public static INFO_TYPE: string = 'component_verify_ticket';
  appId: string;
  infoType: string;
  createTime: number;
  ticket: string;


  constructor(appId: string, infoType: string, createTime: number, ticket: string) {
    super();
    this.appId = appId;
    this.infoType = infoType;
    this.createTime = createTime;
    this.ticket = ticket;
  }
}
