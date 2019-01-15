FROM node:8.12-alpine

WORKDIR /photo-stack-front

# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
COPY package.json ./
RUN cat package.json
# RUN rm -rf node_modules
RUN npm install -g npm@latest
RUN npm install -g react-scripts
RUN npm install -g nodemon@1.11.0
RUN npm install
#  && mv /photo-stack-front/node_modules /node_modules

COPY . .

CMD ["npm", "start"]
# CMD /bin/sh