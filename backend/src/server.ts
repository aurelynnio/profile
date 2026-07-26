import cors from 'cors';
import express from 'express';
import { env } from './lib/env.js';
import { contentRouter } from './routes/content.routes.js';
import { healthRouter } from './routes/health.routes.js';
import { uploadRouter } from './routes/upload.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

export const app = express();

app.use(cors({ origin: env.clientOrigins }));
app.use(express.json({ limit: '2mb' }));

app.use('/api', healthRouter);
app.use('/api/content', contentRouter);
app.use('/api/uploads', uploadRouter);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(env.port, () => {
    console.log(`Content API listening on http://localhost:${env.port}`);
  });
}
