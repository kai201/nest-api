import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('APP')
@Controller()
export class AppController {
  constructor(private health: HealthCheckService) {}

  @Get()
  index(): string {
    return 'Hello Nest!';
  }

  @Get('health')
  @HealthCheck()
  check() {
    return this.health.check([]);
  }
}
