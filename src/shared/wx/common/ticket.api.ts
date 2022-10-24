const getTicketUrl: string = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=%s';

export class JsTicketApi {
  /**
   * 获取api_ticket
   * @param ticketType
   */
  getTicket(ticketType: 'jsapi' | 'wx_card') {}
}

const getCorpTicketUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=%s';
const getAgentTicketUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/ticket/get?access_token=%s&type=agent_config';
export class QyJsTicketApi {
  /**
   * 获取api_ticket
   * @param ticketType
   */
  getTicket(ticketType: 'corp' | 'agent') {}
}
