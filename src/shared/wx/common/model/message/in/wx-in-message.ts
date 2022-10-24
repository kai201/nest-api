import { WxMessage } from '../wx-message';

export abstract class WxInMessage extends WxMessage {
  /**
   * 消息类型
   * 1：text 文本消息
   * 2：image 图片消息
   * 3：voice 语音消息
   * 4：video 视频消息
   * 5：location 地址位置消息
   * 6：link 链接消息
   * 7：event 事件
   */
  msgType: string; //消息类型
  toUserName: string; //开发者微信号
  fromUserName: string; //发送方帐号openId
  createTime: number; //消息创建时间
  agentId: string; // 企业号的应用ID

  constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
    super();
    this.toUserName = toUserName;
    this.fromUserName = fromUserName;
    this.createTime = createTime;
    this.msgType = msgType;
  }
}
