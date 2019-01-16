FROM node:alpine

WORKDIR /photo-stack-front

# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
COPY *.json ./
RUN cat package.json
COPY ./public ./public
COPY ./src ./src
RUN apk add curl
# RUN rm -rf node_modules
# RUN npm install -g npm@latest
# RUN npm install -g react-scripts
RUN npm install -g nodemon@1.11.0
# RUN npm install -g node-sass 
RUN npm install
RUN mkdir -p ./node_modules/node-sass/vendor/linux_musl-x64-67
RUN curl -L https://github.com/sass/node-sass/releases/download/v4.11.0/linux_musl-x64-67_binding.node -o ./node_modules/node-sass/vendor/linux_musl-x64-67/binding.node
RUN npm rebuild node-sass
#  && mv /photo-stack-front/node_modules /node_modules
CMD ["npm", "start"]
# CMD /bin/sh