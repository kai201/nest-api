import './polyfill';

import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { SharedModule } from 'src/shared/shared.module';
import { AdminModule } from 'src/modules/admin/admin.module';
import { SystemModule } from 'src/modules/system/system.module';

import { AppController } from './app.controller';
@Module({
  imports: [SharedModule, TerminusModule, AdminModule, SystemModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
