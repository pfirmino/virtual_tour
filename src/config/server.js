const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const server = express();
const cors = require('./cors');

// view engine setup
server.set('views', path.join(__dirname, '../views'));
server.set('view engine', 'ejs');
server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors);

module.exports = server;
