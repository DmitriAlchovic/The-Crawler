FROM node:18-alpine

WORKDIR /usr/src/app

COPY ./api/package.json /usr/src/app/

COPY ./api/package-lock.json /usr/src/app/

RUN npm install

COPY ./api /usr/src/app/


CMD ["npm", "run", "dev"]