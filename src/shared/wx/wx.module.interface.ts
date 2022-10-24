import { ModuleMetadata } from '@nestjs/common';
import { WxOptions } from './wx.interface';

export declare type WxModuleOptions = {
  wxdev?: WxOptions;
};

export interface WxModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
}
