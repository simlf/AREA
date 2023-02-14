FROM node:14-alpine

RUN npm install -g ionic

RUN npm install -g @angular/cli

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ionic build

EXPOSE 8081

CMD ["ng", "serve"]
