FROM node:current-alpine

# Create app directory
WORKDIR /usr/src/photo-stack-back
ENV PATH /usr/src/photo-stack-back/node_modules/.bin:$PATH
# Install app dependencies
RUN apk add graphicsmagick
COPY package.json ./

# If you are building your code for production
RUN npm update
RUN npm upgrade
RUN npm upgrade npm
RUN npm install
RUN npm update
RUN npm upgrade

# Bundle app source
# COPY ./dist ./dist

EXPOSE 8080
# CMD [ "npm", "run", "prod" ]
# CMD [ "npm", "run", "debug" ]
CMD tsnd --inspect --debug --transpileOnly --respawn src/app.ts