import { Module } from '@nestjs/common';
import { SystemModule } from 'src/modules/system/system.module';
import { UserService } from '../system/user/user.service';

@Module({
  imports: [SystemModule],
})
export class AdminModule {
  constructor(sysUserService: UserService) {}
}
