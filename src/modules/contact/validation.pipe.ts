import { UnauthorizedException, HttpStatus } from '@nestjs/common';
import { createZodValidationPipe } from 'nestjs-zod';
import { ZodError } from 'nestjs-zod/z';

const convertEnLabelToJaLabel = (label: string): string => {
  switch (label) {
    case 'userEmail':
      return 'メールアドレス';

    case 'userName':
      return 'お名前';

    case 'message':
      return 'お問い合わせ内容';
  }
};

// ZodのErrorからエラーメッセージを作成する。
const createErrorMessageFromZodError = (errorData: ZodError): string => {
  return Object.entries(errorData.flatten().fieldErrors)
    .reduce(
      (previous, [key, value]) =>
        (previous += `${convertEnLabelToJaLabel(key)}\n${value.join(
          '\n',
        )}\n\n`),
      '',
    )
    .slice(0, -2);
};

export const contactZodValidationPipe = createZodValidationPipe({
  createValidationException: (error: ZodError) =>
    new UnauthorizedException({
      status: HttpStatus.UNAUTHORIZED,
      error: error,
      zodErrorMessage: createErrorMessageFromZodError(error),
    }),
});
