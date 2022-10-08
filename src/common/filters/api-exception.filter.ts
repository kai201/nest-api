import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { R } from '../class/api-res.class';

/**
 * 异常接管，统一异常返回数据
 */
@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<FastifyReply>();

    // check api exection
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // set json response
    response.header('Content-Type', 'application/json; charset=utf-8');

    let message = '服务器异常，请稍后再试';

    if (status < 500) {
      message = exception instanceof HttpException ? exception.message : `${exception}`;
    }
    const result = R.fail(message);

    console.log(exception);

    response.status(status).send(result);
  }
}
