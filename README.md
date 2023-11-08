# Your Dictionary App (backend part)

Welcome to the backend repository of Your Dictionary App, a language-learning tool developed to facilitate English language acquisition. This repository contains the source code for the app's server and API. 


## Project Overview

Your Dictionary App is a full-stack application that offers features such as word storage, enabling users to perform CRUD operations, along with pronunciation assistance using the Google Text-to-Speech API.

This backend repository encompasses the server environment built with Node.js and Express, and it provides the RESTful API for data exchange with the frontend. Authentication is implemented using JWT (JSON Web Tokens), and TypeScript is used to enhance code quality and maintain strong typing.


## Tech Stack of backend implementation:

- Server Environment: Node.js with Express
- Language: TypeScript
- Database: MongoDB
- API: REST API for seamless data exchange
- Authentication: JWT Authentication


## Getting Started

To set up and run the backend locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install project dependencies by running: `npm install`.
4. Set the following environment variables:
   - `PORT`: The port on which the server will listen for incoming requests.
   - `MONGODB_URL`: The URL to the MongoDB database.
   - `JWT_PRIVATE_KEY`: The private key used for JWT (JSON Web Tokens) authentication.
   - `SECRET_SALT` and `SECRET_PASSPHRASE`: These values should be set to the same values used for encrypting sensitive files such as `googleKey.json.secure`.

    You can set these environment variables using a `.env` file. Create a `.env` file in the project root directory and add the variables with their values. Make     sure to add this file to your `.gitignore` to keep sensitive information secure.
5. Start the server by running: `npm run dev`.

The server should now be running at `http://localhost:PORT`.


## Available Scripts

In this project, you can run the following scripts:
- **`npm run build`**: this script compiles the TypeScript code using `tsc` and then starts the server by running the compiled `index.js` file from the dist folder. It's used to prepare the project for deployment.
- **`npm run dev`**: use this script to run the server in development mode using `nodemon`. It automatically restarts the server when you make code changes, making the development process smoother.
- **`npm run lint`**: run this script to check the TypeScript code for code quality and style issues.
- **`npm run prepare`**: This script is used for Husky, a Git hooks manager, to enforce code quality before commits.
