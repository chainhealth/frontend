# Frontend

## Native Development Environment Setup

To run the application in the development environment, follow these steps:

1. **Navigate to the `frontend` directory:**
    ```sh
    cd frontend
    ```

2. **Ensure you have Node.js version 18.19 installed.** You can check your version with:
    ```sh
    node -v
    ```

3. **Install Angular CLI globally:**
    ```sh
    npm install -g @angular/cli
    ```

4. **Install the required dependencies:**
    ```sh
    npm install
    ```

5. **Start the Angular development server:**
    ```sh
    ng serve
    ```

6. **Visit [localhost:4200](http://localhost:4200) in your web browser to access the application.**

## Production Environment Setup

To run the application in the production environment without Docker, follow these steps:

1. **Navigate to the `frontend` directory:**
    ```sh
    cd frontend
    ```

2. **Build the Angular application for production:**
    ```sh
    npm run build --prod
    ```

3. **Serve the application using a static server.** You can use a package like `http-server`:
    - Install `http-server` globally:
      ```sh
      npm install -g http-server
      ```

4. **Serve the built application:**
    ```sh
    http-server -p 80 ./dist/chain-health-app
    ```

5. **Visit [localhost](http://localhost) in your web browser to access the application.**
   
## Docker Development Environment Setup

To run the application in the development environment, follow these steps:

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```

2. Build the Docker image named `chain-health-dev` using the provided Dockerfile for development:
    ```sh
    docker build -t chain-health-dev -f Dockerfile.dev .
    ```

3. Run the Docker container in interactive mode with port mapping and volume mounting:
    ```sh
    docker run -itp 4200:4200 -v "$(pwd):/app" chain-health-dev
    ```

4. Visit [localhost:4200](http://localhost:4200) in your web browser to access the application.

## Docker Production Environment Setup

To run the application in the production environment, follow these steps:

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```

2. Run Docker Compose to build and start the production containers:
    ```sh
    docker-compose up -d --build
    ```

3. Visit [localhost:80](http://localhost:80) in your web browser to access the application.

