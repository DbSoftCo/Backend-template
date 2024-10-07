# Backend DBSoft Template

This is a boilerplate backend template built with NestJS and MikroORM using PostgreSQL as the database. It includes JWT authentication, Swagger for API documentation, and tools like bcryptjs for password hashing.

## Features
* NestJS: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
* MikroORM: An ORM for TypeScript and Node.js with built-in support for PostgreSQL.
* JWT Authentication: Secure authentication with passport-jwt and bcryptjs for password encryption.
* Swagger: Automatically generated API documentation using nestjs/swagger.
* ESLint & Prettier: Code linting and formatting enforced by ESLint and Prettier.
* Helmet: Basic security headers for Node.js apps.

## Getting Started
### Prerequisites
* Node.js v16 or higher
* PostgreSQL (configured to your liking)
* Yarn, npm or pnpm (depending on your package manager of choice)
### Installation
Clone the repository:
```bash
git clone https://github.com/your-repo/backend-dbsoft-template.git
cd backend-dbsoft-template
```
Install dependencies:
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```
### Environment Configuration
Create a .env file in the root directory and add the necessary environment variables. Here’s an example configuration:

```env
// DATABASE
DATABASE_HOST
DATABASE_PORT
DATABASE_USER 
DATABASE_PASSWORD
DATABASE_NAME

// EMAIL PROVIDER
EMAIL_PROVIDER

// SECURITY
JWT_SECRET
```
## Database Setup
Make sure your PostgreSQL database is running and migrate the database schema:
```bash
# Run MikroORM migrations
npm run mikro-orm migration:up
```
### Running the Application
To start the application in development mode:
```bash
npm run start:dev
```
To start in production mode:
```bash
npm run start:prod
```
By default, the application will run on http://localhost:3000.

### API Documentation
Swagger documentation is available by default. Once the application is running, visit:
```bash
http://localhost:3000/api
```
This will open the Swagger UI for exploring and testing the available API endpoints.

## Testing
Run the test suite using Jest:

```bash
npm run test
```
For continuous test execution while developing:

```bash
npm run test:watch
```
For test coverage reports:
```bash
npm run test:cov
```
## Code Quality
To format your code according to Prettier’s configuration:

```bash
npm run format
```
To lint the code using ESLint:
```bash
npm run lint
```
## Project Structure
```bash
src/
│
├── auth/                   # Authentication module
│   ├── controller/         # Authentication-related controllers
│   ├── dto/                # Data Transfer Objects (DTOs) for authentication
│   ├── entities/           # Entities related to authentication (e.g., Otp)
│   ├── interface/          # Authentication service interfaces
│   ├── repository/         # Repository for handling authentication entities
│   ├── service/            # Authentication services and business logic
│   ├── auth.controller.spec.ts  # Unit tests for the controller
│   ├── auth.module.ts      # Authentication module
│   └── auth.service.spec.ts # Unit tests for the service
│
├── common/
│   └── entities/           # Common entities, such as the base class `BaseEntity`
│
├── users/                  # User management module
│   ├── controller/         # Controllers related to user management
│   ├── dto/                # DTOs related to users
│   ├── entities/           # Entities related to users
│   ├── repository/         # Repository for handling user entities
│   ├── service/            # Services related to user management
│   ├── test/               # Unit tests for the user module
│   ├── types/              # Types related to the user domain
│   └── users.module.ts     # User module
│
├── utils/
│   ├── decorators/         # Custom decorators
│   └── guards/             # Security guards, such as JWT guard
│
├── app.module.ts           # Root module of the application
├── main.ts                 # Application entry point
└── mikro-orm.config.ts     # MikroORM configuration
```
## Available Scripts
* build: Builds the application using NestJS's build system.
* start: Starts the application.
* start:dev: Starts the application in development mode with hot-reload.
* start:prod: Starts the application in production mode.
* format: Formats the codebase using Prettier.
* lint: Lints the codebase using ESLint and fixes issues.
* test: Runs all the tests.
* test:watch: Runs tests in watch mode.
* test:cov: Generates a coverage report.
* test:e2e: Runs end-to-end tests.
## Dependencies Overview
### Main Dependencies
* @nestjs/common, @nestjs/core: Core NestJS modules.
* @mikro-orm/core, @mikro-orm/postgresql: MikroORM with PostgreSQL support.
* @nestjs/swagger: API documentation using Swagger.
* @nestjs/jwt, @nestjs/passport: JWT-based authentication.
* bcryptjs: Password hashing.
* helmet: Adds basic security headers.
* class-validator, class-transformer: DTO validation and transformation.
### Dev Dependencies
* Jest: Testing framework.
* TypeScript: TypeScript support.
* ESLint & Prettier: Linting and code formatting.
License
This project is licensed under the UNLICENSED license.