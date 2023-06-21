# Cursos UFCG Node Backend

This repository contains the backend code for the [Cursos UFCG](http://analytics.ufcg.edu.br/cursosufcg/#/) service. It is an Express/Node.js reimplementation of its [legacy version](https://github.com/analytics-ufcg/cursos-ufcg-backend) in Python. It provides the necessary server-side functionality to support the Cursos UFCG service.

## Getting Started

### Installation

Before running the application, make sure you have the following prerequisites installed:

- Node.js (version 12 or higher)
- Docker (optional - for running Redis and/or the server in a container)

To install the dependencies, run the following command:

```bash
npm install
```

### Configuration

1. Create a `.env` file based on the provided `.env.example` file.

2. Fill in the required environment variables in the `.env` file. Make sure to provide appropriate values (see [Enviroment Variables](#enviroment-variables))

### Usage

- To start the server in development mode:

  - Start the Redis Server (optional):
    ```bash
    npm run redis:run-detached
    ```
  - Run the application in development mode:
    ```bash
    npm run dev
    ```

- To run tests:

  ```bash
  npm test
  ```

- To start the server in production mode:

  - Build the project:
    ```bash
    npm run build
    ```
  - Run the applicatiom in production mode:
    ```bash
    npm start
    ```

- To start the server in a container:
  ```bash
  npm run docker-compose:up
  ```

### Docker

- To build the Docker image:

  ```bash
  npm run docker:build
  ```

- To start the Docker containers using Docker Compose:

  ```bash
  npm run docker-compose:up
  ```

- To stop the Docker containers:

  ```bash
  npm run docker:stop
  ```

### Enviroment Variables

The following is a description of the enviroment variables used in the project.

- `DB_DRIVER`: The database driver (e.g., MySQL ODBC 8.0 Driver).
- `DB_SERVER`: The database server address.
- `DB_PORT`: The database server port.
- `DB_USER`: The database user.
- `DB_PASSWORD`: The database password.
- `DB_NAME`: The name of the database.
- `DB_DEFAULT_SCHEMA`: The default database schema.

- `REDIS_HOST`: The Redis server host.
- `REDIS_PORT`: The Redis server port.
- `REDIS_CACHE_EXPIRATION_TIME_MS`: The expiration time for cached data in milliseconds.

- `OPENCPU_SERVER`: The OpenCPU server address.
- `OPENCPU_PORT`: The OpenCPU server port.

- `API_PORT`: The port on which the API server will run (default 3000)

### Contributing

We welcome contributions to the Cursos UFCG project. If you would like to contribute, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Make your changes and commit them with descriptive commit messages.

4. Push your changes to your forked repository.

5. Submit a pull request to the main repository.

### License

This project is licensed under the [MIT License](LICENSE).
