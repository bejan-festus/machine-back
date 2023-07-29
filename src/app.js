const express = require('express');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const httpStatus = require('http-status');
const routes = require('./routes/v1');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());


// enable cors
app.use(cors());
app.options('*', cors());


// v1 api routes
app.use('/v1', routes);


const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];

  res.status(statusCode).send(response);
};


// handle error
app.use(errorHandler);

module.exports = app;
