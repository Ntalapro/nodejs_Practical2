const express = require('express');
const path = require('path');
const usersRouter = require('./routes/company');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || '6000'
app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/company', usersRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})


