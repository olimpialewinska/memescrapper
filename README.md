# memescrapper

This is a simple Node.js application that scrapes images from a webpage and caches them in a Firebase Firestore database. The application uses the Express web framework to expose a REST API that returns the cached images.

## Prerequisites
To run this application, you need to have the following:

- Node.js installed on your machine
- A Firebase account and a Firebase project set up
- The necessary Firebase credentials, which should be stored in a firebase.ts file in the root directory of the project

## Installation
To install the project dependencies, run the following command in the root directory of the project: npm install

## Usage
To start the application, run the following command in the root directory of the project: npm start
This will start the server on port 3000 by default, or on the port specified in the PORT environment variable.

The server exposes a single endpoint at / that returns a list of the cached images in JSON format.

The application also includes a function cacheImages() that scrapes new images from the webpage and caches them in the Firebase Firestore database. This function is called every hour using the setInterval() method. The initial caching of images is performed on server start-up.

## Acknowledgements
This project was created for educational purposes only. It was developed based on the following technologies:

- Node.js
- Express
- Firebase
- dotenv
- axios
- cheerio
