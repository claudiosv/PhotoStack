FROM node:8.12-alpine

WORKDIR /photo-stack-front

RUN npm install -g nodemon@1.11.0

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install && mv /photo-stack-front/node_modules /node_modules

COPY . /photo-stack-front

CMD ["npm", "start"]