
FROM node:20-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --only=production

USER node 

COPY --chown=node ./src .
COPY --chown=node ./public .

EXPOSE 3000

CMD [ "node", "index.js" ]