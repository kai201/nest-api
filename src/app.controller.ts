import { Controller, Get, Logger } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator, MicroserviceHealthIndicator } from '@nestjs/terminus';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { R } from 'src/common';
import { HttpService } from '@nestjs/axios';

@ApiTags('APP')
@ApiExtraModels(R)
@Controller()
export class AppController {
  private logger = new Logger(AppController.name);
  constructor(
    @InjectRedis() private redis: Redis,
    private health: HealthCheckService,
    private database: TypeOrmHealthIndicator,
    private httpService: HttpService,
  ) {}

  @Get()
  async index() {
    try {
      const result = await this.httpService.axiosRef.get('http://cms/health');
      this.logger.log(result.status);
      return result.data;
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
    // this.logger.log()
    // return 'Hello Nest!';
  }

  @Get('health')
  @HealthCheck()
  check() {
    return this.health.check([() => this.database.pingCheck('mysql')]);
  }
}
