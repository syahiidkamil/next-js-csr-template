# Next.js CSR Authentication Template

A comprehensive template for building client-side rendered (CSR) Next.js applications with React Router v7, authentication, protected routes, and a simple API.

## Features

- **Client-Side Rendering (CSR)**
  - Single Page Application (SPA) architecture
  - React Router v7 for client-side routing
  - Next.js for API routes and server-side functionality

- **Complete Authentication System**
  - Login and Registration
  - Protected Routes
  - Role-Based Access Control (Admin vs Regular Users)

- **API Integration**
  - Auth API (Login, Register)
  - Products API (CRUD operations)
  - Admin Dashboard

- **Modular Architecture**
  - Feature-based organization
  - Clean separation of concerns
  - Reusable components and hooks

## Project Structure

The project follows a feature-based structure:

```
src/
├── components/            # Shared UI components
├── contexts/              # Global context providers
├── lib/                   # Utility libraries
├── pages/
│   ├── api/               # Next.js API routes 
│   ├── client/            # Client-side rendered pages
│   └── index.js           # Entry point for SPA
├── utils/                 # Utility functions
└── App.jsx                # Main SPA component
```

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Authentication

The template uses a simple token-based authentication system with localStorage for persistence. In a production environment, you should implement proper JWT handling, HTTP-only cookies, and more secure authentication practices.

### Default Admin Account

- Email: admin@example.com
- Password: adminpassword

## API Routes

- `/api/auth/login`: POST - Authenticate user
- `/api/auth/register`: POST - Register new user
- `/api/products`: GET (public), POST (admin)
- `/api/products/[id]`: GET (public), PUT/DELETE (admin)

## Client-Side Routing

The template uses React Router v7 for client-side routing:

- `/`: Home page
- `/products`: Products listing
- `/products/:id`: Product details
- `/login`: Login page
- `/register`: Registration page
- `/admin`: Admin dashboard
- `/admin/products`: Admin products management
- `/admin/products/new`: Add new product
- `/admin/products/:id`: Edit product

## Customization

This template is designed to be a starting point. You can:

- Replace the simple JSON database with MongoDB, PostgreSQL, etc.
- Enhance security with proper JWT implementation
- Add more features or expand existing ones
- Customize the UI to match your brand

## License

MIT
