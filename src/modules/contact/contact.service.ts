import { Injectable, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, catchError } from 'rxjs';
import * as FormData from 'form-data';

@Injectable()
export class ContactService {
  constructor(private httpService: HttpService) {}

  convertObjectToFormData(data: { [key: string]: string }): FormData {
    return Object.entries(data).reduce((previous, [key, value]) => {
      previous.append(key, value);
      return previous;
      // TODO
    }, new FormData());
  }

  async sendContactFromData(body: {
    userName?: string;
    userEmail?: string;
    message?: string;
  }) {
    const data = this.convertObjectToFormData(body);
    const request = this.httpService
      .post(process.env.CONTACT_FORM_7_URL as string, data, {
        auth: {
          username: process.env.AUTH_USERNAME as string,
          password: process.env.AUTH_PASSWORD as string,
        },
      })
      .pipe(
        map((response) => {
          if (response.data.status !== 'mail_sent') {
            /**
             * TODO
             * エラーハンドリング
             * https://docs.nestjs.com/exception-filters
             * catchErrorにcatchされて結局500エラーになる。
             */
            throw new UnauthorizedException(
              {
                status: HttpStatus.UNAUTHORIZED,
                error: response.data,
                message: '入力に不足があります。',
              },
              '401',
            );
          }

          return { success: true };
        }),
      )
      .pipe(
        catchError((error) => {
          throw new Error(error);
        }),
      );

    return await lastValueFrom(request);
  }
}
