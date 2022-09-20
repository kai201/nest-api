import { NacosInstance } from './nacos.interface';

const DEFAULT_WEIGHT = 10;
/**
 *
 * @param { Array<NacosInstance> } pool 实例服务数据池
 */
export class Weight {
  /** 默认权重 10  */
  _defaultWeight: number = DEFAULT_WEIGHT;

  /** 数据池  */
  _pool: NacosInstance[] = [];

  /** 上次选择的服务器*/
  _pos: number;

  /** 最大权重*/
  _maxWeight: number;

  /** 当前权重*/
  _weight: number;

  /** 权重的最大公约数*/
  _gcdWeight: number;

  constructor(pool: NacosInstance[]) {
    this.reset(pool);
  }

  get size() {
    return this._pool.length;
  }

  /**
   * 欧几里得算法（求最大公约数）
   * @param  {...any} arr odo
   * @return {*} number
   */
  _gcd(...arr: number[]): number {
    if (!arr.length) return 0;
    const data: number[] = [...arr];
    return data.reduce((x, y) => (!y ? x : this._gcd(y, x % y)));
  }

  /**
   * 重置数据池
   * @param {*} pool todo
   */
  reset(pool: NacosInstance[]) {
    if (Object.prototype.toString.call(pool) !== '[object Array]') {
      throw new Error('[nacos] Property ‘pool’ must is Array!');
    }

    let maxWeight = 0;

    const healthyPool: NacosInstance[] = [];

    const weights: number[] = [];

    pool.forEach((item) => {
      /** 只保留健康有效的实例 */
      if (Object.prototype.toString.call(item) === '[object Object]' && item.healthy === true) {
        healthyPool.push(item);
        item.weight = item.weight || this._defaultWeight;

        weights.push(item.weight);

        maxWeight = Math.max(maxWeight, item.weight);
      }
    });

    this._gcdWeight = this._gcd(...weights);
    this._maxWeight = maxWeight;
    this._pool = healthyPool;
    this._pos = -1;
    this._weight = 0;
  }

  /**
   * 返回一个服务实例
   * @returns {NacosInstance} NacosInstance
   */
  pop(): NacosInstance {
    if (!this.size) return null;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      this._pos = (this._pos + 1) % this.size;

      if (this._pos === 0) {
        this._weight = this._weight - this._gcdWeight;

        if (this._weight <= 0) {
          this._weight = this._maxWeight;

          if (this._weight === 0) return null;
        }
      }

      const service = this._pool[this._pos];

      if (service.weight >= this._weight) {
        return service;
      }
    }
  }
}
