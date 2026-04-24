FROM node:20-alpine AS dev
COPY . /app
WORKDIR /app
RUN npm i

FROM node:20-alpine AS build
COPY . /app/
COPY --from=dev /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM nginx:stable-trixie
COPY --from=build /app/build/client /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# build image
# docker build -t auth-fullstack-client .

# lancer le conteneur
# docker run -p 80:80 auth-fullstack-client