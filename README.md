# Next.js SPA with Fastify Backend

A comprehensive template for building client-side rendered (CSR) Next.js applications with React Router, a Fastify backend API, and a PostgreSQL database, all in a single codebase that can be deployed to Vercel or other hosting platforms.

## Features

- **Single Page Application (SPA) Frontend**
  - React Router for client-side routing
  - Tailwind CSS for styling
  - Complete authentication flow

- **Fastify Backend API**
  - Feature-based architecture for maintainability
  - JWT authentication
  - PostgreSQL database integration via Prisma ORM
  - Type-safe database access

- **Architecture Highlights**
  - KISS and YAGNI principles applied throughout
  - Single responsibility for each module
  - Feature-based organization for both frontend and backend
  - Clean separation of concerns
  - Modular and maintainable codebase

## Project Structure

```
src/
├── features/                # Frontend features
│   ├── auth/                # Authentication UI components
│   ├── dashboard/           # Dashboard components
│   └── profile/             # Profile components
├── server/                  # Backend code (Fastify)
│   ├── features/            # Backend features
│   │   └── auth/            # Auth routes and controllers
│   ├── shared/              # Shared server code
│   │   ├── config/          # Configuration
│   │   ├── db/              # Database utilities
│   │   └── middlewares/     # Shared middlewares
│   └── index.js             # Server entry point
├── shared/                  # Shared frontend code
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility libraries
│   └── routes/              # Route definitions
├── pages/                   # Next.js pages
│   ├── api/                 # API route for proxying to Fastify
│   │   └── [[...all]].js    # Catch-all API route
│   └── index.js             # Main page (SPA entry)
└── App.jsx                  # Main React component
```

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your environment variables:
   ```
   # Copy from .env.example and update with your values
   cp .env.example .env.local
   ```
4. Initialize the database:
   ```bash
   npm run db:init
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

This template uses PostgreSQL with Prisma ORM. To set up:

1. Copy `.env.local.example` to `.env.local` and update the `DATABASE_URL` with your PostgreSQL connection string:
   ```bash
   cp .env.local.example .env.local
   # Then edit .env.local with your database credentials
   ```

2. Run Prisma migrations to set up your database schema:
   ```bash
   npm run db:migrate
   ```

3. Seed the database with initial data:
   ```bash
   npm run db:seed
   ```

4. (Optional) Launch Prisma Studio to browse and edit your data:
   ```bash
   npm run db:studio
   ```

### Default Admin User

- **Email:** admin@example.com
- **Password:** adminpassword

## API Routes

- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user profile (authenticated)
- `PATCH /api/auth/me` - Update user profile (authenticated)

## Deployment

### Vercel Deployment

This template is designed to work seamlessly with Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel project settings
3. Deploy!

### Database Considerations

For production, use a managed PostgreSQL service like:
- Neon
- Supabase
- Railway
- AWS RDS

## Adding New Features

### Backend

1. Create a new directory in `src/server/features/`
2. Add routes and controllers
3. Register routes in `src/server/index.js`

### Frontend

1. Create components in `src/features/`
2. Add routes in `src/App.jsx`
3. Create services for API communication

## License

MIT
