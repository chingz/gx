FROM node:9.5.0-alpine

# set working directory
RUN mkdir /usr/app
WORKDIR /usr/app

# add `/usr/src/node_modules/.bin` to $PATH
ENV PATH /usr/app/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json .
RUN npm install --silent

# start app
CMD ["npm", "run", "serve"]