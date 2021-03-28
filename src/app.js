const express = require('express');
const runRouter = require('./routes/run');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("RunKeeper");
})
app.use('/runs', runRouter);

module.exports = app;