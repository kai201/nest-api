import { Module, SetMetadata } from '@nestjs/common';
import { MODULE_PATH } from '@nestjs/common/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import SysUser from 'src/model/sys-user.model';

import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
@SetMetadata(MODULE_PATH, 'sys')
@Module({
  imports: [TypeOrmModule.forFeature([SysUser])],
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService],
})
export class SystemModule {}
