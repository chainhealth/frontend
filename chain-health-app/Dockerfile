FROM node:18.13.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
# npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
# RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build

FROM nginx:stable
COPY --from=build /app/dist/chain-health-app/browser /usr/share/nginx/html
EXPOSE 80




