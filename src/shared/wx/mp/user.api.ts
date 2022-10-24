import { format } from 'util';
import { AccessToken } from '../access-token';
import { Kits } from '../api-kit';
import { HttpDelegate } from '../wx.interface';
import { MPWeChat } from './we-chat';

const updateRemarkUrl: string = 'https://api.weixin.qq.com/cgi-bin/user/info/updateremark?access_token=%s';
const getUserUrl: string = 'https://api.weixin.qq.com/cgi-bin/user/get?access_token=%s';
const getUserInfoUrl: string = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=%s&openid=%s';
const batchGetUrl: string = 'https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=%s';
const getBlackListUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/members/getblacklist?access_token=%s';
const batchBlackListUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchblacklist?access_token=%s';
const batchUnBlackListUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchunblacklist?access_token=%s';

export class UserApi {
  private http: HttpDelegate = Kits.http;

  constructor(private session: MPWeChat) {}

  /**
   *  设置用户备注名
   *  @param openId
   *  @param remark
   */
  public async updateRemark(openId: string, remark: string) {
    let accessToken: AccessToken = await this.session.getAccessToken();
    let url = format(updateRemarkUrl, accessToken.accessToken);
    return this.http.httpPost(url, JSON.stringify({ openid: openId, remark: remark }));
  }

  /**
   *  获取用户列表
   *  @param nextOpenid
   */
  public async getFollowers(nextOpenid?: string) {
    let accessToken: AccessToken = await this.session.getAccessToken();
    let url = format(getUserUrl, accessToken.accessToken);
    if (nextOpenid) {
      url += '&next_openid=' + nextOpenid;
    }
    return this.http.httpGet(url);
  }
}
