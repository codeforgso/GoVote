FROM node:carbon

# Create app directory
RUN mkdir -p /opt/app

# install dependencies first, in a different location for easier app bind mounting for local development
WORKDIR /opt
COPY package.json package-lock.json* ./
RUN npm install && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

# Bundle app source
WORKDIR /opt/app
COPY . /opt/app

# Express server
EXPOSE 3001
# React port
EXPOSE 3000

# Prevents browser from launching inside of the container
ENV BROWSER=none

CMD ["npm", "start"]
