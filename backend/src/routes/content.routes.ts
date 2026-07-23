import { Router } from 'express';
import { contentController } from '../controllers/content.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { validateBody } from '../middleware/validate.middleware.js';
import { contentInputSchema } from '../schemas/content.schema.js';

export const contentRouter = Router();

contentRouter.get('/:type', contentController.list);
contentRouter.get('/:type/:slug', contentController.getBySlug);

contentRouter.post(
  '/:type',
  requireAdmin,
  validateBody(contentInputSchema),
  contentController.create,
);
contentRouter.patch(
  '/:type/:slug',
  requireAdmin,
  validateBody(contentInputSchema),
  contentController.update,
);
contentRouter.delete(
  '/:type/:slug',
  requireAdmin,
  contentController.remove,
);
