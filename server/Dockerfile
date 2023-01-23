FROM node:alpine

WORKDIR /server

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "start:dev"]
