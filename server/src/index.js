/**
 * Main server entry point that creates and configures the Fastify instance
 */
import 'dotenv/config'; // This loads .env file at the very beginning
import Fastify from 'fastify';

// Import shared plugins
import { authPlugin } from './shared/middlewares/auth';
import { corsPlugin } from './shared/middlewares/cors';

// Import feature routes
import { authRoutes } from './features/auth/routes';

/**
 * Build and configure the Fastify server
 * @returns {FastifyInstance} Configured Fastify instance
 */
export async function buildServer() {
  // Create Fastify instance with logging
  const fastify = Fastify({
    logger: true,
    trustProxy: true,
  });

  try {
    // Log environment variables (without sensitive info)
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Port:', process.env.PORT);
    console.log('CORS origin:', process.env.CORS_ORIGIN);
    console.log('JWT Secret exists:', !!process.env.JWT_SECRET);
    
    // Register shared plugins
    await fastify.register(corsPlugin);
    await fastify.register(authPlugin);
    
    // Register health check route
    fastify.get('/health', async () => {
      return { status: 'ok' };
    });

    // Register feature routes
    await fastify.register(authRoutes, { prefix: '/api' });
    
    // Add more feature routes here
    // await fastify.register(import('./features/products/routes'), { prefix: '/api' });
    
    fastify.log.info('All plugins and routes registered successfully');
    return fastify;
  } catch (err) {
    fastify.log.error('Error building server:', err);
    throw err;
  }
}

/**
 * Start the server when running directly (not imported)
 */
const start = async () => {
  try {
    const server = await buildServer();
    const port = process.env.PORT || 3001;
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

// Start the server
start();
