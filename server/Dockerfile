# base image
FROM node:11.14

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install

# start app
CMD ["npm", "start:dev"]

# Copied from: https://mherman.org/blog/dockerizing-a-react-app/