import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SysUser from 'src/model/user.model';

import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([SysUser])],
  controllers: [UserController],
  providers: [UserService],
})
export class SystemModule {}
