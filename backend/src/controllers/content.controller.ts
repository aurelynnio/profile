import type { NextFunction, Request, Response } from 'express';
import { contentTypes, type ContentType } from '../types/content.js';
import { contentService } from '../services/content.service.js';

const isContentType = (value: string | string[]): value is ContentType =>
  typeof value === 'string' && contentTypes.includes(value as ContentType);

const rejectUnknownType = (
  response: Response,
) => {
  response.status(404).json({ error: 'Unknown content type.' });
  return false;
};

export const contentController = {
  async list(request: Request, response: Response, next: NextFunction) {
    try {
      const type = request.params.type;
      if (!isContentType(type)) {
        rejectUnknownType(response);
        return;
      }
      const items = await contentService.listPublished(type);
      response.json(items);
    } catch (error) {
      next(error);
    }
  },

  async getBySlug(request: Request, response: Response, next: NextFunction) {
    try {
      const type = request.params.type;
      if (!isContentType(type)) {
        rejectUnknownType(response);
        return;
      }
      const record = await contentService.getBySlug(type, String(request.params.slug));
      if (!record) {
        response.status(404).json({ error: 'Content not found.' });
        return;
      }
      response.json(record);
    } catch (error) {
      next(error);
    }
  },

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const type = request.params.type;
      if (!isContentType(type)) {
        rejectUnknownType(response);
        return;
      }
      const record = await contentService.create(type, request.body);
      response.status(201).json(record);
    } catch (error) {
      next(error);
    }
  },

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const type = request.params.type;
      if (!isContentType(type)) {
        rejectUnknownType(response);
        return;
      }
      const record = await contentService.update(type, String(request.params.slug), request.body);
      response.json(record);
    } catch (error) {
      next(error);
    }
  },

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const type = request.params.type;
      if (!isContentType(type)) {
        rejectUnknownType(response);
        return;
      }
      await contentService.remove(type, String(request.params.slug));
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  },
};
