const express = require('express');
const mongoose = require('mongoose');
const signupRouter = require('../routes/signup');
const signinRouter = require('./signin');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/testdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
app.use((req, res, next) => {
  req.user = { _id: '60b7d9a051232d4260b1ee1f' };
  next();
});
*/

app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.listen(PORT, () => console.log(`listening on port ${PORT} . . .`));