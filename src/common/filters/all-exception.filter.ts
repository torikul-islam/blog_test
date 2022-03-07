import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp(),
      response = ctx.getResponse<Response>();
    let message: string = '',
      status: number = 400;

    if (exception instanceof HttpException) {
      message = exception.message;
      status = exception.getStatus();
    } else {
      message = exception.message;
      status = 500;
    }
    const data = {
      success: false,
      message: message,
      data: {},
    };
    response.status(status).send(data);
  }
}
