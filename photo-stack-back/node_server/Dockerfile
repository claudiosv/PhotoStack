FROM node:current-alpine

# Create app directory
WORKDIR /usr/src/photo-stack-back

RUN apk add --no-cache graphicsmagick
COPY package.json ./
RUN rm -rf node_modules/
RUN npm install
RUN npm install pm2 -g

CMD [ "pm2-runtime", "start", "src/app.js", "--watch"]