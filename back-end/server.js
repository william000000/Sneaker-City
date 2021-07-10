const express = require('express');
const router = require('./routers/index');
const cors = require('cors');

const app = express();
const serverPort = 9001;

app.use(cors())
app.use("/api", router);

app.get('/', function (req, res) {
    res.status(200).send({ message: 'Welcome to Sneaker City Shop'})
});

app.use('*', (req, res) => res.status(404).send({
    message: 'Ooops the route you are looking for, It does not exists!'
  }));

app.listen(serverPort);
console.log(`Server is running on the port of ${serverPort}.`);

module.exports = app;