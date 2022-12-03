import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    ContactModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    ThrottlerModule.forRoot({
      ttl: 60 * 15,
      limit: 30,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
