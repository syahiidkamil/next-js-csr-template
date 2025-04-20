/**
 * Authentication middleware for Fastify routes
 * Uses JWT to authenticate requests
 */
import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';

// Ensure dotenv is loaded
dotenv.config();

export const authPlugin = fp(async (fastify) => {
  const jwtSecret = process.env.JWT_SECRET;
  
  if (!jwtSecret) {
    console.error('JWT_SECRET environment variable is not set!');
    fastify.log.error('JWT_SECRET environment variable is required');
    // Instead of throwing an error, use a fallback for development
    const fallbackSecret = 'fallback-jwt-secret-for-development-only';
    console.warn(`Using fallback JWT secret: ${fallbackSecret} - DO NOT USE IN PRODUCTION!`);
    
    // Register JWT plugin with fallback secret
    await fastify.register(jwt, {
      secret: fallbackSecret,
    });
  } else {
    // Register JWT plugin with proper secret
    await fastify.register(jwt, {
      secret: jwtSecret,
    });
  }

  // Authentication decorator to be used in routes
  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send({ 
        success: false, 
        message: 'Unauthorized' 
      });
    }
  });

  fastify.log.info('Authentication plugin registered');
});
