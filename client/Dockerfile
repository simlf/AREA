FROM node:14-alpine

RUN npm install -g @ionic/cli

RUN npm install -g @angular/cli

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ionic build

CMD ["ng", "serve"]
