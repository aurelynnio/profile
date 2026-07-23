import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { config } from './config.js';
import { supabase } from './supabase.js';

export const requireAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request
    .header('authorization')
    ?.replace(/^Bearer\s+/i, '');
  if (!token) {
    response
      .status(401)
      .json({
        error: 'Authentication is required.',
      });
    return;
  }

  const { data, error } =
    await supabase.auth.getUser(token);
  const email = data.user?.email?.toLowerCase();
  if (
    error ||
    !email ||
    !config.adminEmails.has(email)
  ) {
    response
      .status(403)
      .json({
        error:
          'Administrator access is required.',
      });
    return;
  }

  next();
};
