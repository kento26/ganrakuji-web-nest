import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [HttpModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
