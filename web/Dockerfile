FROM node:14-alpine

RUN npm install -g ionic

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ionic build

EXPOSE 8001

CMD [ "ionic", "serve" ]
