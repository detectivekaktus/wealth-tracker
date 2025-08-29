# Nuxt app Dockerfile that is meant to be ran in the
# development environment
FROM node:lts-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "dev"]