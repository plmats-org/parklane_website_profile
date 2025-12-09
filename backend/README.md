# Parklane Backend

Node.js/Express backend for Parklane platform.

## Tech Stack

- Node.js + TypeScript 5.1.3
- Express.js 4.21.2
- MongoDB + Mongoose 8.0.0
- JWT Authentication (bcrypt)
- Sentry Error Tracking

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
NODE_ENV=development
PORT=8000

MONGODB_URI=mongodb://localhost:27017/parklane

JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

SENTRY_DSN=your-sentry-dsn
```
for more variables check the .env.example

3. Run development server:
```bash
npm run dev
```

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Users (Admin)
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PATCH /api/users/:id`
- `DELETE /api/users/:id`

## Scripts

```bash
npm run dev          # Development with hot reload
npm run build        # Build for production
npm start            # Run production build
npm run db:seed      # Seed database
```

## Docs

- Swagger UI: http://localhost:8000/api-docs
- Health Check: http://localhost:8000/health
