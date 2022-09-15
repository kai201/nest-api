import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { R } from 'src/common';

@ApiTags('APP')
@ApiExtraModels(R)
@Controller()
export class AppController {
  constructor(private health: HealthCheckService, private database: TypeOrmHealthIndicator) {}

  @Get()
  index(): string {
    return 'Hello Nest!';
  }

  @Get('health')
  @HealthCheck()
  check() {
    return this.health.check([() => this.database.pingCheck('mysql')]);
  }
}
