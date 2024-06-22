FROM node:20-alpine as build


WORKDIR /usr/src/app

COPY package*.json .

# Could cache 
RUN npm ci 

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:1.23-alpine-perl

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["npm", "run", "dev"]