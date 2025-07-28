# Boxful API

A NestJS-based REST API for Boxful application with MongoDB database and JWT authentication.

## 🚀 Quick Start with Docker

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Setup & Run

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd boxful-api
   ```

2. **Copy environment variables**

   ```bash
   cp .env.example .env
   ```

3. **Start the application**
   ```bash
   docker-compose up -d
   ```

That's it! 🎉 The API will be running at http://localhost:3001

### What's Running?

- **API**: http://localhost:3001 (NestJS application)
- **MongoDB**: localhost:27017 (Database)
- **Frontend can run on**: http://localhost:3000 (port 3000 is free)

## 📋 Environment Configuration

The `.env` file contains all necessary configuration:

```env
# MongoDB Configuration
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=secret
MONGO_INITDB_DATABASE=boxful-api
MONGO_URI=mongodb://admin:secret@localhost:27017/boxful?authSource=admin

# Application Configuration
NODE_ENV=development
PORT=3001

TZ=UTC
APP_TIMEZONE=UTC-6

# JWT Configuration
JWT_SECRET=ed0130c8fe23cc6d9a7b8659e48f3ecd
JWT_TOKEN_AUDIENCE=localhost:3001
JWT_TOKEN_ISSUER=localhost:3001
JWT_ACCESS_TOKEN_TTL=3600
```

> ⚠️ **Security Note**: Change the `JWT_SECRET` in production. You can generate a new one at https://jwtsecrets.com/#generator

## 🏗️ Architecture

### Tech Stack

- **Framework**: NestJS (Node.js)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Validation**: class-validator & class-transformer
- **Documentation**: Built-in with NestJS

### Key Features

- 🔐 **JWT Authentication** with refresh tokens
- 👥 **User Management** (sign-up, sign-in)
- 📦 **Orders Management** with date filtering
- 🔍 **Advanced Filtering** with reusable QueryBuilder
- 🛡️ **Guards & Decorators** for authorization
- 🐳 **Docker** ready for development and production

## 🔧 Available Commands

### Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up -d --build

# Reset database (removes all data)
docker-compose down -v && docker-compose up -d
```

### Development Commands (if running without Docker)

If you run without docker you need to change the `MONGO_URI` in `.env` to `mongodb://localhost:27017/boxful-api`. when is running in docker starts with `mongodb` but if you run without docker it should be `localhost`.

```bash
# Install dependencies
npm install

# Development mode
npm run start:dev

# Build
npm run build

# Production mode
npm run start:prod

# Testing
npm run test           # unit tests
npm run test:e2e       # e2e tests
npm run test:cov       # test coverage

# Code quality
npm run lint           # ESLint
npm run format         # Prettier
```

## 📚 API Endpoints

### Authentication

```
POST /authentication/sign-up      # Register new user
POST /authentication/sign-in      # Login user
POST /authentication/refresh-token # Refresh access token
```

### Orders

```
GET    /orders                    # Get user orders (with filtering)
POST   /orders                    # Create new order
GET    /orders/:id                # Get specific order
```

### Query Parameters for Orders

```
# Date filtering
GET /orders?date_from=2025-01-01&date_to=2025-01-31

```

## 🔐 Authentication

### Request Headers

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Response Format

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🗄️ Database Schema

### User Schema

```typescript
{
  name: string;
  last_name: string;
  gender: string;
  birth_date: Date;
  email: string; // unique
  phone: string;
  password: string; // encrypted
  created_at: Date;
  updated_at: Date;
}
```

### Order Schema

```typescript
{
  pickup_address: string;
  programmed_date: Date;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  deliver_address: string;
  city: string;
  municipality: string;
  reference_place: string;
  indications: string;
  items: OrderItem[];
  status: string;       // default: 'created'
  user_id: ObjectId;    // reference to User
  created_at: Date;
  updated_at: Date;
}
```

## 🛠️ Development

### Project Structure

```
src/
├── common/              # Shared utilities
│   ├── builders/        # QueryBuilder for filtering
│   ├── decorators/      # Custom decorators
│   └── interfaces/      # Common interfaces
├── iam/                 # Identity & Access Management
│   ├── authentication/  # Auth service & controller
│   ├── decorators/      # @ActiveUser, @Auth
│   └── guards/          # Authentication guards
├── orders/              # Orders module
├── users/               # Users module
├── schemas/             # MongoDB schemas
└── main.ts             # Application entry point
```

### Adding New Modules

The project follows NestJS modular architecture. Use the reusable components:

```typescript
// Use QueryBuilder for filtering
const query = new QueryBuilder({ user_id: userId })
  .addDateRange('created_at', filters.date_from, filters.date_to)
  .addStringFilter('status', filters.status)
  .build();
```

## 🐛 Troubleshooting

### Common Issues

**Port already in use**

```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or change port in .env file
PORT=3002
```

**MongoDB connection failed**

```bash
# Recreate containers
docker-compose down -v
docker-compose up -d
```

**JWT token invalid**

```bash
# Check JWT configuration in .env
# Ensure JWT_TOKEN_AUDIENCE and JWT_TOKEN_ISSUER match your setup
```

### Logs

```bash
# API logs
docker-compose logs -f app

# MongoDB logs
docker-compose logs -f mongodb

# All logs
docker-compose logs -f
```
