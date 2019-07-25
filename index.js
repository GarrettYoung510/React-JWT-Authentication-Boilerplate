// this is our server file
// dependencies/requirements
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

// invoke express
const app = express();

// Database Setup
mongoose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true, useCreateIndex: true});

// Middlewares Setup
// invoke morgan
app.use(morgan('combined'));
// invoke body parser for express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// invoke cors
app.use(cors());

// If we are in production, serve our clients build folder
// This folder is created in production ONLY
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}

// Routes Setup
const routes = require('./routes');
app.use(routes);
// process env PORT
const PORT = process.env.PORT || 3001;
// listen on port
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}!`));