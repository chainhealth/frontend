# Frontend

## Development Environment Setup

To run the application in the development environment, follow these steps:

1. Navigate to the `chain-health-app` directory:
    ```sh
    cd chain-health-app
    ```

2. Build the Docker image named `chain-health-dev` using the provided Dockerfile for development:
    ```sh
    docker build -t chain-health-dev -f Dockerfile.dev .
    ```

3. Run the Docker container in interactive mode with port mapping and volume mounting:
    ```sh
    docker run -itp 4200:4200 chain-health-dev
    ```

4. Visit [localhost:4200](http://localhost:4200) in your web browser to access the application.

## Production Environment Setup

To run the application in the production environment, follow these steps:

1. Navigate to the `chain-health-app` directory:
    ```sh
    cd chain-health-app
    ```

2. Run Docker Compose to build and start the production containers:
    ```sh
    docker-compose up -d --build
    ```

3. Visit [localhost:80](http://localhost:80) in your web browser to access the application.

