FROM node:18.19 AS build
WORKDIR /app

RUN npm install -g @angular/cli

COPY package*.json ./


RUN npm install

COPY . .

RUN ng add @angular/material



RUN npm run build --prod

FROM nginx:stable
COPY --from=build /app/dist/chain-health-app/browser /usr/share/nginx/html
EXPOSE 80




