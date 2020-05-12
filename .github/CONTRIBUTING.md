[![Build Status](https://travis-ci.org/codeforgso/GoVote.svg?branch=dev)](https://travis-ci.org/codeforgso/GoVote)

# How to contribute to the GoVote project

We are glad you are here. We need volunteer developers to help this project come to fruition. Contributors of all skill levels are encouraged to get involved! All contributions are subject to our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Getting Started

In order to get the project running on your local machine, you must first [fork](https://help.github.com/articles/fork-a-repo/) the project to your GitHub account.

Having done that, you can now clone the git repository from your profile:

```sh
git clone https://github.com/<YOUR_GITHUB_USERNAME>/GoVote.git
```

This will create a new directory on your machine called "GoVote", that you should then `cd` into.

```sh
cd GoVote
```

The project has been properly cloned at this point, and it is time to get it up and running. Run the following commands to build the govote image, create and seed the database, and start the containers.

## Development

### Run the project with Docker & Docker-Compose

>Recommended for Mac, Linux and Windows 10 Pro users

The GoVote project uses [Docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/). You will need to install both to properly run the project.

#### Install Docker

- [Mac](https://docs.docker.com/docker-for-mac/install/)
- [Windows 10 Pro](https://docs.docker.com/docker-for-windows/install/)
- [Ubuntu/Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
  - [Install Docker-Compose](https://docs.docker.com/compose/install/)
- [Windows 10 Home Edition](https://docs.docker.com/toolbox/overview/)

#### Running the project

After cloning the project and installing Docker/Docker-Compose, run the following commands in a terminal

```sh
cp sample.env .env # Copy the sample.env to .env. The file has already been filled with default values
docker-compose down -v  # forces the stop and removal of containers that may have been previously built
docker-compose build
docker-compose up -d # Starts the database and server in the background. Access the app at http://localhost:3000
npm run docker:create-tables # Creates the database tables
npm run docker:etl # Loads the board of elections data into the database
```

To stop the project run `docker-compose stop`


### Run the project with NodeJS
1. Install NodeJS if you do not already have it

    - Mac/Linux use [Node Version Manager](https://github.com/creationix/nvm)
    - Windows see [here](https://nodejs.org/en/download/)

1. Install Postgresql

    - Postgresql is a database system. This app uses Postgesql to store voter data. When running the app using Node, you have to have a local Postgresql database that will get loaded with the voter data.
    - MAC: the easist way to install Postgresql is with homebrew using the command below. It can also be downloaded from <https://www.postgresql.org/download/,> however, you will need to change your PATH.

        ```sh
        brew install postgresql
        ```

    - Windows: Postgresql downloads can be found here: https://www.postgresql.org/download/
        - use the "Interactive Installer by Enterprise DB" after selecting your OS
    - Note that the default user "postgres" and database "postgres" is assumed for this project. If you provided a password for postgres during the installation, you need to provide the password in DB_PASS in the next step. If you are comfortable with postgresql and want to create your out database/user/table, feel free to do so, just be sure the make the appropriate changes in the net step.

1. Create a file called `.env` in the root of the project. The file should contain the following:

    ```sh
    REACT_APP_GOOGLEMAPAPIKEY=AIzaSyC_jVntO1agQ5gRABrvZfSkjMy6pvXXNzI
    DATABASE_URL=postgres://postgres:@localhost:5432/postgres
    DB_TABLE=voters
    ```

1. Open a terminal session at the root of your project and perform the following to initialize and start the application:

    1. Start the postgresql database and load voter data to it:

        Windows

        ```sh
        npm run loadDataWin
        ```

        Mac

        ```sh
        npm run loadDataMac
        ```

    1. Update your application with all the required node modules. Normally, this only needs to be one time.

        ```sh
        npm install
        ```

    1. Start the application

        ```sh
        npm start
        ```

1. Open a browser and go to http://localhost:3000

1. To stop the application, from the terminal session where 'npm start' was run

    ```sh
    Ctrl+c
    ```

1. To stop the database server, from a terminal session at the root of the project

    Windows

    ```sh
    pg_ctl -D "C:\Program Files\PostgreSQL\11\data" stop
    ```

    Mac

    ```sh
    pg_ctl -D /usr/local/var/postgres stop
    ```

### Project Details

The project uses [ReactJS](https://reactjs.org/) as a UI library, and the server runs on NodeJS utilizing the [Express](https://expressjs.com/) framework. Our code linting is done with [ESLint](https://eslint.org/), and if you have followed the Getting Started steps, any linting errors should be present in your console. Please confirm that all linter errors are resolved before [Creating a Pull Request](https://help.github.com/articles/creating-a-pull-request/).

All of the client-side React code lives in the `/client` directory of the project, while the server code is located in `/server`.

The client-side code includes use of Google Maps JavaScript API and the GeoCoding API.

The client-side proxies API request to be backend. This prevents CORS errors during development. The default location is defined in the `package.json` as `http://localhost:3001`.  
The proxy location can be overridden by setting the `API_PROXY` environment variable. For example `API_PROXY=http://localhost:8000 npm start`

1. Use of these API's requires a Google API key.See https://developers.google.com/maps/documentation/embed/get-api-key for information on obtaining a key.

1. Once you have your API key, we suggest you:
    1. go to https://console.cloud.google.com
    1. add an Application Restriction for HTTP referrers for your site or Localhost:3000
    1. add API Restrictions allowing only the JavaScript and Geocoding API's

1. Your Google API key must be provided in the env file (found in the project root directory) in a variable named REACT_APP_GOOGLEMAPAPIKEY. Do not add any quotes around the key ( example: REACT_APP_GOOGLEMAPAPIKEY=12345abcd ).

### Bug Fixes

#### **Did you find a bug?**

- **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/codeforgso/GoVote/issues/new).

- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/codeforgso/GoVote/issues/new).
Follow the [Issue template](./ISSUE_TEMPLATE.md) and be sure to include as much information as possible in the bug section of the issue template. Required information for reported bugs include: **Expected Behavior**, **Current Behavior**, **Possible Solution**, and **Steps to Reproduce**.

#### **Did you write a patch that fixes a bug?**

- Open a new GitHub pull request with the patch.

- Ensure the PR description clearly describes the problem and solution. Include the relevant issue number if applicable.

- Fill out the information requested in the [Pull Request Template](./PULL_REQUEST_TEMPLATE.md) to the best extent possible.

#### **Do you want to add a new feature or change an existing one?**

- Suggest and [discuss your change in a new issue](https://github.com/codeforgso/GoVote/issues/new) using the the **feature discussion** section of the issue template. Gennerally, it is a good idea to discuss a path forward relating to a proposed, or existing feature change prior to submitting a pull request to avoid a rejected contribution.

#### **Do you have questions about the source code?**

- Ask any question about the project or contributing by [opening a new issue](https://github.com/codeforgso/GoVote/issues/new) and labeling it as a question.

## Deploying your code
Our code is deployed to Heroku to be served to the public. This happens in three stages:
1. **build**&mdash;Heroku will automatically run `npm install` and cache the project's depedencies. Next, Heroku looks for a `build` task in the root `package.json` file. We use this step to build our React project, which optimizes our React code to be served statically.
2. **run**&mdash;Heroku runs the `web` task in the `Procfile`, which simply starts our thin Express server to handle incoming requests and serve our compiled React app.
3. **release**&mdash;Heroku runs the `release` task in the Procfile after deploying the application. Note that this task runs in a separate dyno (Heroku's term for a compute instance), so it will not have access to files from other parts of the build process. In our case, we ensure the database has the correct tables and the data is properly loaded.

When you merge your PR, it will be merged into the project's `dev` branch which will automatically kick off a deploy to our [staging server](https://dev-govote-api.herokuapp.com/). After you have merged your code, please test your changes and other basic flows (including finding your polling place and someone's voter registration) on the staging server.

When you are confident in your changes, merging the `dev` branch into `master` will deploy your changes to production.

## Thank You!

The GoVote project is a volunteer effort. We encourage you to pitch in!

The Code for Greensboro Team
