FROM node:16-alpine
RUN apk add --no-cache bash

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force
COPY . /app
RUN npm run build

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh && \
    ln -s usr/local/bin/docker-entrypoint.sh /

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["node", "./dist/main.js"]
