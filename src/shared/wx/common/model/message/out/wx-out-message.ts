import { WxInMessage } from '../in/wx-in-message';

export abstract class WxOutMessage {
  // 接收方帐号 openId
  toUserName: string;
  // 开发者微信号
  fromUserName: string;
  // 消息创建时间
  createTime: number;
  /**
   *  被动响应消息类型
   *  1：text 文本消息
   *  2：image 图片消息
   *  3：voice 语音消息
   *  4：video 视频消息
   *  5：music 音乐消息
   *  6：news 图文消息
   */
  msgType: string;

  protected now(): number {
    return new Date().getTime();
  }

  constructor(inMessage: WxInMessage) {
    this.toUserName = inMessage.fromUserName;
    this.fromUserName = inMessage.toUserName;
    this.createTime = this.now();
  }

  public toXml(): string {
    let xmlContent = '<xml>\n<ToUserName><![CDATA[' + this.toUserName + ']]></ToUserName>\n';
    xmlContent += '<FromUserName><![CDATA[' + this.fromUserName + ']]></FromUserName>\n';
    xmlContent += '<CreateTime>' + this.createTime + '</CreateTime>\n';
    xmlContent += '<MsgType><![CDATA[' + this.msgType + ']]></MsgType>\n';
    return xmlContent;
  }
}
