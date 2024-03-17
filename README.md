# frontend

## to run in dev

cd chain-health-app
docker build -t chain-health-dev -f Dockerfile.dev .
docker run -itp 4200:4200 -v "$(pwd):/app" chain-health-dev
vist localhost:4200


## to run in prod 
cd chain-health-app
docker compose up -d --build
visit localhost:80 



==========================



ng new chain-health-app --no-standalone
cd chain-health-app
ng generate component login