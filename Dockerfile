# STAGE 1
FROM node:alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# STAGE 2
FROM nginx:alpine

COPY --from=build /app/dist/fragrance-angular /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
