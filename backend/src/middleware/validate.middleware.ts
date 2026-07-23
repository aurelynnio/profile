import type { NextFunction, Request, Response } from 'express';
import { ZodError, type ZodSchema } from 'zod';

export const validateBody = (schema: ZodSchema) =>
  (request: Request, response: Response, next: NextFunction) => {
    const result = schema.safeParse(request.body);
    if (!result.success) {
      response.status(400).json({
        error: 'Invalid request body.',
        details: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });
      return;
    }
    request.body = result.data;
    next();
  };

export const isZodError = (error: unknown): error is ZodError =>
  error instanceof ZodError;
