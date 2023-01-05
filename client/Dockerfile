FROM node:lts-alpine

WORKDIR /app

COPY package.json .

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

RUN npm install

COPY . .

CMD ["npm", "start"]
