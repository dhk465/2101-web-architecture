const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const users = require('./routes/users');

const app = express();

let conn = process.env.ATLAS;
if (conn == null || conn == "") {
  conn = 'mongodb://localhost:27017/progracker';
}

mongoose.connect(conn, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName: 'progracker'
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to mongo'));

app.use(express.json());
app.use(express.static('public'));
app.use('/users', users);
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'ssshhh',
    resave: true,
    saveUninitialized: true,
    cookie: {}
}));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => console.log(`Server ready at http://localhost:${port}`));