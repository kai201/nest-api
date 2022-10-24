import { ICache } from './wx.interface';

export class DefaultCache implements ICache {
  private map: Map<string, string> = new Map<string, string>();

  async get(key: string): Promise<string> {
    return this.map.get(key) || '';
  }

  async set(key: string, jsonValue: string) {
    this.map.set(key, jsonValue);
  }

  async remove(key: string) {
    this.map.delete(key);
  }
}
