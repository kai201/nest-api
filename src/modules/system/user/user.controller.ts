import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import SysUser from 'src/model/user.model';

@ApiTags('SysUser')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @ApiOkResponse({ type: [SysUser] })
  async getHello(): Promise<SysUser[]> {
    const result = await this.userService.list();

    return result;
    // return 'Hello World!';
  }
}
