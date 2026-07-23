import { Router } from 'express';
import multer from 'multer';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { supabase } from '../lib/supabase.js';

export const uploadRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

uploadRouter.post(
  '/',
  requireAdmin,
  upload.single('file'),
  async (request, response, next) => {
    try {
      if (!request.file) {
        response.status(400).json({ error: 'A file is required.' });
        return;
      }
      const extension = path.extname(request.file.originalname).toLowerCase();
      const filePath = `${new Date().getUTCFullYear()}/${randomUUID()}${extension}`;
      const { error } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, request.file.buffer, {
          contentType: request.file.mimetype,
          upsert: false,
        });
      if (error) throw error;
      const { data } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);
      response.status(201).json({ path: filePath, url: data.publicUrl });
    } catch (error) {
      next(error);
    }
  },
);
