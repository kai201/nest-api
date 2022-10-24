import { WxInAuthMpEventMessage } from './model/message/in/wx-in-mp-auth-event';
import { WxInVerifyTicketMessage } from './model/message/in/wx-in-verify-ticket';

export interface MsgAdapter {}

export interface OpenMsgAdapter extends MsgAdapter {
  // 推送 component_verify_ticket
  processInComponentVerifyTicket(message: WxInVerifyTicketMessage): Promise<string>;
  // 微信开放平台授权通知事件
  processInAuthMpEvent(inAuthMpEvent: WxInAuthMpEventMessage): Promise<string>;
}
