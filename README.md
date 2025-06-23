# InstaPay API

A modern, secure payment processing API built with NestJS, Prisma, and PostgreSQL. InstaPay provides instant money transfers, transaction management, and comprehensive admin controls for financial applications.

## Features

- **User Authentication** - JWT-based authentication with role-based access control
- **Bank Account Management** - Link/unlink multiple bank accounts per user
- **Instant Transfers** - Real-time money transfers between accounts
- **Transaction History** - Complete audit trail of all transactions
- **Daily Limits** - Configurable spending limits with automatic tracking
- **Refund System** - Request and process transaction refunds
- **Admin Dashboard** - User management, transaction monitoring, and reporting
- **Notifications** - Real-time in-app notifications for transactions
- **API Documentation** - Interactive Swagger/OpenAPI documentation

## Tech Stack

- **Backend**: NestJS (Node.js)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport.js
- **Documentation**: Swagger/OpenAPI
- **Validation**: Class Validator & Class Transformer
- **Architecture**: Repository Pattern, Factory Pattern, Observer Pattern

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Docker (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd instapay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file with:
   DATABASE_URL="postgresql://username:password@localhost:5432/instapay"
   SECRET_KEY="your-jwt-secret-key"
   SALT_ROUNDS="10"
   PORT="3000"
   NODE_ENV="development|production"
   PROTOCOL="https|http"
   APP_URL="your-production-server-url"
   ```

4. **Set up database**
   ```bash
   # Run migrations
   npx prisma migrate deploy
   
   # Generate Prisma client
   npx prisma generate
   ```

5. **Start the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run start:prod
   ```

### Using Docker

```bash
# Start PostgreSQL with Docker
docker run --name instapay-db -e POSTGRES_PASSWORD=Backend@2004 -e POSTGRES_DB=mydb -p 5432:5432 -d postgres:latest

# Or use the provided Dockerfile
docker build -t instapay-db .
docker run -p 5432:5432 instapay-db
```

## API Documentation

Once the application is running, access the interactive API documentation at:
- **Development**: http://localhost:3000/docs
- **Production**: https://your-domain.com/docs

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - User login

### Users
- `POST /users/linkBankAccount` - Link bank account
- `GET /users/showBankAccounts` - View linked accounts
- `PATCH /users/updateProfile` - Update user profile

### Transactions
- `POST /transactions/make-transaction` - Create transaction
- `GET /transactions/show-all` - View transaction history
- `POST /transactions/accept-refund/:id` - Accept refund request

### Admin (Admin access required)
- `GET /admin/users` - Manage users
- `GET /admin/transactions` - Monitor transactions
- `GET /admin/report` - Generate reports

### Notifications
- `GET /notifications/:userId` - Get user notifications
- `PATCH /notifications/:id/read` - Mark as read

## Database Schema

The application uses the following main entities:
- **User** - User accounts with authentication and profile data
- **BankAccount** - Linked bank accounts with balances
- **Transaction** - Payment records with status tracking
- **Notification** - In-app notification system

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control (User/Admin)
- Daily transaction limits
- Input validation and sanitization
- SQL injection prevention with Prisma

## Development

```bash
# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Lint code
npm run lint

# Format code
npm run format
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the UNLICENSED License - see the package.json file for details.

## Support

For support and questions, please open an issue in the GitHub repository.