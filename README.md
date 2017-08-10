# GoVote
This project's goal is to create a web application that the local public can use to easily view their voter registration and election candidate information based on their names and addresses.

Look up your voter status and get info on voting, voting registration, and election candidates.

*Detailed description of the project coming soon!*

## Installation
Make sure you have [Node](https://nodejs.org/en/) >= 4 installed (we strongly recommend using Node >= 6 and npm >= 3).
We prefer to use the [yarn](https://yarnpkg.com/) npm client.

### To install:

````
    cd path-to-my-dev-directory
    git clone https://github.com/codeforgso/GoVote.git && cd goodtogogso && yarn
    yarn start
````

If you prefer to use npm, the equivalent procedure is:

````
    cd path-to-my-dev-directory
    git clone https://github.com/codeforgso/GoVote.git && cd goodtogogso && npm install
    npm start
````

The client application is running at http://localhost:8080/. 

## Basic Architecture

The server side is implemented via Express. The public site is a React/Redux App.
