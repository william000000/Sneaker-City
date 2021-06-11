const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./routers/index');

const app = express();
const serverPort = 9001;

app.use(cors());

app.use("/api", router);

app.use('*', function (req, res) {
    res.redirect('api/products');
});

app.listen(serverPort);
console.log(`Server is running on the port of ${serverPort}.`);
