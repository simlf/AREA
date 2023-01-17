# AREA

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

AREA is an app that allows you to easily connect various services together, similar to IFTT. With AREA, you can automate tasks and streamline your workflow by creating custom "recipes" that link different services together.

## Features

-   Easy to use interface for creating and managing recipes
-   Support for a wide variety of popular services such as Gmail, League of Legends, Twitter, etc.
-   Triggers and actions can be customized to fit your specific needs
-   Ability to chain multiple actions together to create complex recipes

## Usage

### Using Docker Compose

The project can be easily run using Docker Compose. To get started, make sure you have Docker and Docker Compose installed on your machine.

1.  Build the Docker images: `docker-compose build`
2.  Start the containers: `docker-compose up`
3.  The web app will be running at [http://localhost:8001](http://localhost:8001/)

#### Notes:

- You may need to update the environment variables in the `docker-compose.yml` file to match your specific setup.

- Every time you add a new package to your `package.json` file or make any changes to it or the `.env` file, please consider rebuilding the docker image using `docker-compose down && docker-compose up --build`.

- To stop the containers, simply run `docker-compose down`.

- You can also run the app in background by running `docker-compose up -d`.

- To see the logs of the containers, use `docker-compose logs -f`.

- You can change the ports exposed in the `docker-compose.yml` file.

- To open the container inside your shell, you can run `docker exec -it myapp_backend sh`. But keep in mind that you won't be able to execute commands like `vim` or `emacs`.

## Using Nest.js with NPM

The project is built with [Nest.js](https://nestjs.com/) and can be easily run with NPM. To get started, make sure you have Node.js and NPM installed on your machine.

1.  Navigate to the server directory: `cd server`
3.  Install the dependencies: `npm install`
4.  Start the server: `npm run start`
5.  The app will be running at [http://localhost:8000](http://localhost:8000/)

To run the app in development mode, use `npm run start:dev`.

To run the tests, use `npm run test`.

You can change the ports exposed in the `.env` file.

Make sure you have the correct version of Node installed, check the `.nvmrc` or `.node-version` for the version.

## Getting Started

1.  Download and install the AREA app on your device
2.  Sign in or create an account
3.  Browse the available services and select the ones you want to use
4.  Create a new recipe and select the trigger and action(s) you want to use
5.  Save and activate your recipe

## Examples of use

-   Automatically send a tweet every time a new item is added to your RSS feed
-   Send a text message to your phone when an email from a specific sender arrives in your inbox
-   Automatically save attachments from specific emails to your cloud storage account

## License

This project is licensed under the MIT License.
