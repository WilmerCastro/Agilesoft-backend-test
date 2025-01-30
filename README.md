# Agilesoft Backend Test

This README document provides detailed instructions for cloning, setting up, launching, and testing the Agilesoft project, which has been developed using the following technologies:

- **NestJS:** A JavaScript framework designed for building scalable server-side applications.
- **TypeORM:** An ORM that facilitates interaction with SQL databases using TypeScript.
- **PostgreSQL:** A relational database management system.
- **Docker:** A solution for operating system-level application virtualization.
- **Docker Compose:** A tool for defining and managing multi-container applications.
- **Clean Architecture:** A design method that organizes code into clear and well-defined layers, improving modularity, flexibility, and testability.

## Setup and Execution

### Prerequisites

Before starting, ensure that the following components are installed on your workstation:

- [NodeJS](https://nodejs.org/) v16.x
- PostgreSQL
- Docker
- Docker Compose (To use the provided `docker-compose.yml` file.)

### Initialization

#### Clone the Repository

Start by cloning the repository onto your workstation:

```sh
git clone https://github.com/WilmerCastro/Agilesoft-backend-test.git
```

#### Configure Environment Variables

Create a `.env` file in the project root directory and include the following configurations:

```sh
API_PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres
```

#### Execution

Once the `.env` file is configured, you can launch the service using Docker Compose with the following command:

```sh
docker-compose up
```

This command performs several actions, including:

- **Container Creation**
- **Database Migrations Execution**
- **Initial Data Seeding**

> The service will be available at <http://localhost:3000/api/>

### Authentication

You only need to create a user (see Swagger) and then log in to obtain an authentication token. With this token, you can access other protected endpoints.

### Documentation

For effective API integration and usage, complete documentation is provided via Swagger within the project. This documentation is available at:

```url
http://localhost:3000/docs
```

### Testing

To run tests, use the following command:

```sh
npm run test
