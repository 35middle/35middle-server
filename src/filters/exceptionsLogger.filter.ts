import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
  constructor(private logger: Logger) {
    super();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error('Exception thrown', exception);
    super.catch(exception, host);
  }
}
