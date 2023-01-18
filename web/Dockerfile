FROM node:14-alpine

RUN npm install -g ionic

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN ionic build

EXPOSE 8100

CMD [ "ionic", "serve" ]
