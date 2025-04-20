/**
 * CORS middleware for Fastify routes
 */
import fp from 'fastify-plugin';
import cors from '@fastify/cors';
import { env } from '../config/env';

export const corsPlugin = fp(async (fastify) => {
  await fastify.register(cors, {
    origin: (origin, cb) => {
      // In production, restrict to allowed origins
      // For development, allow any origin
      const allowedOrigins = [
        env.frontendUrl,
        'http://localhost:3000',
      ];
      
      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
        return;
      }
      
      cb(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
  });

  fastify.log.info('CORS plugin registered');
});
