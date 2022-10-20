import { Module, SetMetadata } from '@nestjs/common';
import { MODULE_PATH } from '@nestjs/common/constants';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SysUser } from './user/user.model';
import { SysRole } from './role/role.model';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { Customer } from './customer/model';
import { CustomerService } from './customer/service';
import { CustomerController } from './customer/controller';
import { SysLink } from './link/model';
import { SysLinkController } from './link/controller';
import { SysLinkService } from './link/service';

@SetMetadata(MODULE_PATH, 'sys')
@Module({
  imports: [TypeOrmModule.forFeature([SysUser, SysRole, Customer, SysLink])],
  controllers: [UserController, RoleController, CustomerController, SysLinkController],
  providers: [UserService, RoleService, CustomerService, SysLinkService],
  exports: [UserService, RoleService, CustomerService, SysLinkService],
})
export class SystemModule {}
