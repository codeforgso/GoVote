[![Build Status](https://travis-ci.org/codeforgso/GoVote.svg?branch=dev)](https://travis-ci.org/codeforgso/GoVote)

# How to contribute to the GoVote project

We are glad you are here. We need volunteer developers to help this project come to fruition. Contributors of all skill levels are encouraged to get involved! All contributions are subject to our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Development
The GoVote project uses [Docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/). You will need to install both to properly run the project.

### Getting Started
In order to get the project running on your local machine, you must first [fork](https://help.github.com/articles/fork-a-repo/) the project to your GitHub account.

Having done that, you can now clone the git repository from your profile:
```
$ git clone https://github.com/<YOUR_GITHUB_USERNAME>/GoVote.git
```

This will create a new directory on your machine called "GoVote", that you should then `cd` into.
```
$ cd GoVote
```

The project has been properly cloned at this point, and it is time to get it up and running. Run the following commands to build the govote image, create and seed the database, and start the containers.
``` bash
docker-compose build
docker-compose up -d # Starts the database and server in the background. Access the app at http://localhost:3000
docker-compose exec govote node ./bin/create-tables.js # Creates the database tables
docker-compose exec govote node ./bin/etl.js # Seeds the database
```
To stop the project run `docker-compose stop`

### Project Details
The project uses [ReactJS](https://reactjs.org/) as a UI library, and the server runs on NodeJS utilizing the [Express](https://expressjs.com/) framework. Our code linting is done with [ESLint](https://eslint.org/), and if you have followed the Getting Started steps, any linting errors should be present in your console. Please confirm that all linter errors are resolved before [Creating a Pull Request](https://help.github.com/articles/creating-a-pull-request/).

All of the client-side React code lives in the `/src` directory of the project, while the server code is located in `/server`.

### Bug Fixes

#### **Did you find a bug?**

* **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/codeforgso/GoVote/issues/new).

* If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/codeforgso/GoVote/issues/new).
Follow the [Issue template](./ISSUE_TEMPLATE.md) and be sure to include as much information as possible in the bug section of the issue template. Required information for reported bugs include: **Expected Behavior**, **Current Behavior**, **Possible Solution**, and **Steps to Reproduce**.

#### **Did you write a patch that fixes a bug?**

* Open a new GitHub pull request with the patch.

* Ensure the PR description clearly describes the problem and solution. Include the relevant issue number if applicable.

* Fill out the information requested in the [Pull Request Template](./PULL_REQUEST_TEMPLATE.md) to the best extent possible.

#### **Do you want to add a new feature or change an existing one?**

* Suggest and [discuss your change in a new issue](https://github.com/codeforgso/GoVote/issues/new) using the the **feature discussion** section of the issue template. Gennerally, it is a good idea to discuss a path forward relating to a proposed, or existing feature change prior to submitting a pull request to avoid a rejected contribution.

#### **Do you have questions about the source code?**

* Ask any question about the project or contributing by [opening a new issue](https://github.com/codeforgso/GoVote/issues/new) and labeling it as a question.

## Thank You!
The GoVote project is a volunteer effort. We encourage you to pitch in!

The Code for Greensboro Team
