import { format } from 'util';
import { AccessToken } from '../access-token';
import { Kits } from '../api-kit';
import { MPWeChat, OpenAuthWeChat } from './we-chat';

const updateRemarkUrl: string = 'https://api.weixin.qq.com/cgi-bin/user/info/updateremark?access_token=%s';
const getUserUrl: string = 'https://api.weixin.qq.com/cgi-bin/user/get?access_token=%s';
const getUserInfoUrl: string = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=%s&openid=%s';
const batchGetUrl: string = 'https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=%s';
const getBlackListUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/members/getblacklist?access_token=%s';
const batchBlackListUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchblacklist?access_token=%s';
const batchUnBlackListUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchunblacklist?access_token=%s';

/**
 *  设置用户备注名
 *  @param session
 *  @param openId
 *  @param remark
 */
export async function updateRemark(session: MPWeChat | OpenAuthWeChat, openId: string, remark: string) {
  let accessToken: AccessToken = await session.getAccessToken();
  let url = format(updateRemarkUrl, accessToken.accessToken);
  return Kits.http.httpPost(url, JSON.stringify({ openid: openId, remark: remark }));
}

/**
 *  获取用户列表
 *  @param session
 *  @param nextOpenid
 */
export async function followers(session: MPWeChat | OpenAuthWeChat, nextOpenid: string) {
  let accessToken: AccessToken = await session.getAccessToken();
  let url = format(getUserUrl, accessToken.accessToken);
  if (nextOpenid) {
    url += '&next_openid=' + nextOpenid;
  }
  return Kits.http.httpGet(url);
}

/**
 *  获取用户基本信息（包括UnionID机制）
 *  @param session
 *  @param openId
 *  @param lang
 */
export async function getUser(session: MPWeChat | OpenAuthWeChat, openId: string, lang?: string) {
  let accessToken: AccessToken = await session.getAccessToken();
  let url = format(getUserInfoUrl, accessToken.accessToken, openId);
  if (lang) {
    url += '&lang=' + lang;
  }
  return Kits.http.httpGet(url);
}

/**
 *  拉黑用户
 *  @param session
 *  @param openidList  需要拉入黑名单的用户的openid，一次拉黑最多允许20个
 */
export async function batchBlackList(session: MPWeChat | OpenAuthWeChat, openidList: string[]) {
  let accessToken: AccessToken = await session.getAccessToken();
  let url = format(batchBlackListUrl, accessToken.accessToken);
  return Kits.http.httpPost(url, JSON.stringify({ openid_list: openidList }));
}

/**
 *  取消拉黑用户
 *  @param session
 *  @param openidList
 */
export async function batchUnBlackList(session: MPWeChat | OpenAuthWeChat, openidList: string[]) {
  let accessToken: AccessToken = await session.getAccessToken();
  let url = format(batchUnBlackListUrl, accessToken.accessToken);
  return Kits.http.httpPost(url, JSON.stringify({ openid_list: openidList }));
}
