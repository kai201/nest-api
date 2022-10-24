import { format } from 'util';
import { AccessToken } from '../access-token';
import { Kits } from '../api-kit';
import { HttpDelegate, ICache, WeChatSession } from '../wx.interface';

export class CorpWeChat implements WeChatSession {

  private cache: ICache = Kits.cache;
  private http: HttpDelegate = Kits.http;

  // 企业ID
  corpId: string;

  public async getAccessToken(): Promise<AccessToken> {
    throw new Error('Method not implemented.');
  }
  public async refreshAccessToken(): Promise<AccessToken> {
    throw new Error('Method not implemented.');
  }
}
