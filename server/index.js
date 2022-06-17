/* project setup 
npm init -y "create package.json file"
npm i express express-graphql graphql mongoose "help us connect and create database models" cors colors
npm i -D nodemon "constantly watch our files and we don have to keep restarting" dotenv "to create .env files"
create server folder "to be our graphql API"
create server/index.js "our entry point"
create npm scripts to run this in packagejson (node start,nodemon dev) "npm run dev"
create a database in mongodb atlas, install mongodb compass to manage localy
connect to compass "copy link from mongodb atlas database"
changing the password and test string at the end
go to connect to aplication in mongodb cluster
add in .env file "MONGO_URI"
create a config folder in server, and create a db.js
connected to the database
create inside server  modules to create mongo models
create a Client.js file and a Project.js file
add to schema.js mongoose models
now we can add data, those are mutations, queries are for fetching data and mutations are to update and add data
*/

// create simple express server
const express = require('express');
const colors = require('colors'); // bring colors
const cors = require('cors');
require('dotenv').config(); // to make .env file work
const { graphqlHTTP } = require('express-graphql'); // bring graphqlhttp, 
const schema = require('./schema/schema'); // bring schema
const connectDB = require('./config/db'); // bring connection function
const port = process.env.PORT || 5000; // create port variable i environment variables (.env file)
 
const app = express(); // create an app variable and initialize express

// connect to database (mongodb)
connectDB();

app.use(cors());

app.use( // saw in docs, graphql endpoints and schema
    '/graphql',
     graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development' // use graphiql in development if in procution this will be false
}))

app.listen(port, console.log(`Server running on port ${port}`)); // listen on that port and console log message 