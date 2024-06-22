
FROM node:20-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --only=production

USER node 

COPY --chown=node ./public ./public
COPY --chown=node ./src ./src
COPY --chown=node ./index.js ./
COPY --chown=node ./.env ./

EXPOSE 3000

CMD [ "node", "index.js" ]