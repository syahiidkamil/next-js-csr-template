/**
 * Auth routes for Fastify server
 */
import { login, register, getProfile, updateProfile } from './controllers';

/**
 * Auth routes plugin
 * @param {FastifyInstance} fastify - Fastify instance
 */
export async function authRoutes(fastify) {
  // Login route
  fastify.post('/auth/login', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
        },
      },
    },
    handler: login,
  });

  // Register route
  fastify.post('/auth/register', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', minLength: 2 },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
        },
      },
    },
    handler: register,
  });

  // Get current user profile (protected route)
  fastify.get('/auth/me', {
    preHandler: fastify.authenticate,
    handler: getProfile,
  });

  // Update current user profile (protected route)
  fastify.patch('/auth/me', {
    preHandler: fastify.authenticate,
    schema: {
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string', minLength: 2 },
        },
      },
    },
    handler: updateProfile,
  });
}
