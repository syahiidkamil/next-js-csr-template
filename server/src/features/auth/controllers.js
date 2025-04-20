/**
 * Auth controllers for handling authentication requests
 */
import bcrypt from 'bcryptjs';
import { env } from '../../shared/config/env';
import prisma from '../../shared/db/prisma';

/**
 * Login controller
 */
export async function login(request, reply) {
  const { email, password } = request.body;

  try {
    // Find user in database using Prisma
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    
    // If user not found or password doesn't match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return reply.status(401).send({
        success: false,
        message: 'Invalid email or password',
      });
    }
    
    // Create sanitized user object without password
    const sanitizedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    
    // Generate JWT token
    const token = request.server.jwt.sign(sanitizedUser, {
      expiresIn: env.jwt.expiresIn,
    });
    
    return {
      success: true,
      user: sanitizedUser,
      token,
      message: 'Login successful',
    };
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
}

/**
 * Register controller
 */
export async function register(request, reply) {
  const { name, email, password } = request.body;
  
  try {
    // Check if user exists using Prisma
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    
    if (existingUser) {
      return reply.status(409).send({
        success: false,
        message: 'User with this email already exists',
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user with Prisma
    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'user',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });
    
    // Generate JWT token
    const token = request.server.jwt.sign(newUser, {
      expiresIn: env.jwt.expiresIn,
    });
    
    return reply.status(201).send({
      success: true,
      user: newUser,
      token,
      message: 'Registration successful',
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
}

/**
 * Get current user profile
 */
export async function getProfile(request, reply) {
  try {
    const user = request.user;
    
    // Get fresh user data from database using Prisma
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    
    if (!userData) {
      return reply.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    
    return {
      success: true,
      user: userData,
    };
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
}

/**
 * Update user profile
 */
export async function updateProfile(request, reply) {
  const { name } = request.body;
  const userId = request.user.id;
  
  try {
    // Update user using Prisma
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    
    return {
      success: true,
      user: updatedUser,
      message: 'Profile updated successfully',
    };
  } catch (error) {
    request.log.error(error);
    // If user not found, Prisma will throw a P2025 error
    if (error.code === 'P2025') {
      return reply.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    
    return reply.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
}
