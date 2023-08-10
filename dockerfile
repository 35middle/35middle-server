FROM node:16.20.2

RUN npm i -g @nestjs/cli typescript ts-node

COPY package*.json /tmp/app/
RUN cd /tmp/app && npm install

COPY . /usr/src/app
RUN cp -a /tmp/app/node_modules /usr/src/app

WORKDIR /usr/src/app
RUN rm -rf .env && cp env-example .env

CMD yarn run start:dev