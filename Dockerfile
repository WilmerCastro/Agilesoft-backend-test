FROM node:16-alpine
RUN apk add --no-cache bash

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force
COPY . /app
RUN npm run build

CMD ["node", "./dist/main.js"]
