import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async sendForgetPasswordLink(userEmail: string, forgetPasswordLink: string) {
    const emailServiceEndpoint = this.configService.get<string>(
      'app.emailServiceEndpoint',
    );

    await lastValueFrom(
      this.httpService.post(emailServiceEndpoint, {
        userEmail,
        forgetPasswordLink,
      }),
    );
  }
}
