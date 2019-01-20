FROM node:current-alpine

# Create app directory
WORKDIR /usr/src/photo-stack-back

RUN apk add graphicsmagick
COPY package.json ./
# only src directory is mounted so we need to copy our package.json
# in theory should copy the lock too, but no.
RUN npm install
RUN npm install pm2 -g

CMD [ "pm2-runtime", "start", "src/app.js", "--watch"]