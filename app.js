const express = require('express');
const path = require('path');
const usersRouter = require('./routes/company');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/company', usersRouter);

module.exports = app;
