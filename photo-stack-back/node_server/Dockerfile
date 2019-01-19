FROM node:current-alpine

# Create app directory
WORKDIR /usr/src/photo-stack-back

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# RUN apk add --no-cache graphicsmagick
COPY package.json ./
# COPY src ./src 
RUN rm -rf node_modules/
RUN npm install
RUN npm install image-size --save
# RUN npm install -g 
RUN npm install pm2 -g
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source


# CMD [ "npm", "start" ]
CMD [ "pm2-runtime", "start", "src/app.js", "--watch"]