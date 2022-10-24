import { HttpDelegate, ICache } from './wx.interface';
import { DefaultCache } from './default-cache';

export class Kits {
  static cache: ICache = new DefaultCache();
  static http: HttpDelegate = {} as any;
  static devMode: boolean = false;
}
