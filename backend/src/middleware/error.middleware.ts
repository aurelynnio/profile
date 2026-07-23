import type { NextFunction, Request, Response } from 'express';
import { isZodError } from './validate.middleware.js';

export const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  console.error(error);

  if (isZodError(error)) {
    response.status(400).json({
      error: 'Validation failed.',
      details: error.issues,
    });
    return;
  }

  const message =
    error instanceof Error ? error.message : 'Unexpected server error.';
  response.status(500).json({ error: message });
};
