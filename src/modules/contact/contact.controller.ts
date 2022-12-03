import { Controller, Post, Body, UsePipes } from '@nestjs/common';

import { ContactService } from './contact.service';
import { contactZodValidationPipe } from './validation.pipe';
import { ContactZodDto } from './contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UsePipes(contactZodValidationPipe)
  async postContactFromData(@Body() body: ContactZodDto) {
    return await this.contactService.sendContactFromData(body);
  }
}
