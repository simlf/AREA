 FROM node:alpine
 WORKDIR /server
 COPY . .
 RUN npm install
 RUN npm run build
 CMD ["npm", "run", "start:dev"]

#FROM node:latest
#
#ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
#ENV PATH=$PATH:/home/node/.npm-global/bin
#
#RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
#
##WORKDIR /server
#WORKDIR /home/node/app
#
#COPY --chown=node:node ./package*.json /home/node/app/
#
#USER node
#
#RUN npm install
#
#COPY --chown=node:node . .
#
#RUN npm run build
#
#CMD ["npm", "run", "start:dev"]


