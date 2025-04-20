/**
 * Prisma client instance
 * This file exports a singleton instance of the Prisma client
 * to be used throughout the application
 */
import { PrismaClient } from '@prisma/client';

// Create a singleton instance of PrismaClient
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // In development, we want to reuse the same instance across hot reloads
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
