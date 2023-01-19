FROM node:alpine

WORKDIR /server

COPY . .

# This command is similar to npm install, except it's meant to be used in automated environments such as continuous integration -- or any situation where you want to make sure you're doing a clean install of your dependencies.
RUN npm ci
RUN npm run build

CMD ["npm", "run", "start:dev"]
