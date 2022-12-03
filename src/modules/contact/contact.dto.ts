import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const contactSchema = z.object({
  userEmail: z
    .string()
    .min(1, { message: '入力必須の項目です。' })
    .email({ message: 'メールアドレスの形式ではありません。' }),
  userName: z.string().min(1, { message: '入力必須の項目です。' }),
  message: z.string().min(1, { message: '入力必須の項目です。' }),
});

export class ContactZodDto extends createZodDto(contactSchema) {}
