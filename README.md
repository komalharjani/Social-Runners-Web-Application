# Social Runners - Practical 3 for module cs5003 @ University of St Andrews CS

## Prerequisites
The clients or front-ends are meant to run in a web browser, preferable Chrome as there were issues with the google Maps API in other browsers. They makes use of standard ES6 functionality and are compliant with all newer versions of modern browsers (Chrome).
The server requires node.js. It was developed using node v8.9.4. It should be compatible with all versions of node that support ES6.
Express.js 4.17 is also required.
For a full list of all required packages please refer to "package.json".

## Instructions to run
Cd into the file's root directory. Start the server with the command "node server.js".
In a browser (provided you run the client locally) type in http://localhost:3000/ to start a client. 

## Coding, reusability, maintainability
The server-side code is split into these files: server.js, model.js, config.js, dao.js:  
**model.js** provides a model for validating a new user submission for the database
**server.js** starts and controls the program flow on the server-side. Provides all endpoints for the communication between clients and the database
**config-db.js and config-dbRun.js** config files provide configuration details for initialising the database
**dao.js and daoRun.js** these provide functions to create a database, views and querying the database.

The client relies on three files: index.html, main.js and style.css all 
**index.html** basic html scaffolding and use of google Maps API
**style.css** styling and layout 
**client.js** client-side code for the UI

## Built With
ES6 object oriented javascript
Node.js
Express.js
CouchDB
Google Maps API (Places)

## Contributing
This is a one-off practical for a University of St Andrews CS MSc program. Contributions will not be supported.

## Authors
190021896
Project base and instructions by Ruth Letham

## Acknowledgments
Ruth Letham for guidance and support
Contributors to stackoverflow for many javascript related answers
