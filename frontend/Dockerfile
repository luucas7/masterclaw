FROM node:18-alpine

ARG FRONT_END_PORT

WORKDIR /usr/src/app

RUN echo "Argument port is : $FRONT_END_PORT"

COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

EXPOSE ${FRONT_END_PORT}

CMD ["npm", "start"]