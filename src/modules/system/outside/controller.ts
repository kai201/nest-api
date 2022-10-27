import { Body, Controller, Get, Param, Post, Query, ParseArrayOptions, ParseArrayPipe } from '@nestjs/common';
import { ApiOperation, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { R, ApiResResponse } from 'src/common';
import { OpenWeChat, WxUser } from 'src/shared/wx/mp';
import { OpenAuthWeChat } from 'src/shared/wx/mp/we-chat';
/**
 * 外部接口
 * outside
 * outside
 */
@ApiTags('outside')
@Controller('outside')
export class OutsideController {
  constructor(private session: OpenWeChat) {}
  @Get()
  @ApiOperation({ summary: 'test' })
  async get(authId: string) {
    
    let authSession = new OpenAuthWeChat(this.session, null);

    WxUser.getUser(authSession, '');

    return '';
  }
}
