# build 
FROM node:lts-alpine3.22 AS build
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# production
FROM node:lts-alpine3.22
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --only=production 
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/app.js"]

# build l image
# docker build -t auth-fullstack-server .

# lancer le conteneur
# docker run --env-file .env -p 3000:3000 auth-fullstack-server

# commande pour verifier que ça marche 
# docker ps
