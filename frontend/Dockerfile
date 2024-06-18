FROM node:18-alpine

ARG FRONT_END_PORT

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install --loglevel verbose

COPY . /usr/src/app

EXPOSE ${FRONT_END_PORT}

CMD ["npm", "run", "dev"]