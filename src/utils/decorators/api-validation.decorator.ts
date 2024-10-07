import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiValidationErrors() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Validation errors',
      schema: {
        example: {
          statusCode: 400,
          message: [
            'username must be a string',
            'password must be at least 6 characters long',
            'email must be a valid email address',
          ],
          error: 'Bad Request',
        },
      },
    }),
  );
}
