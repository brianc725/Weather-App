'use strict';

const express = require('express');
const Redis = require("ioredis");

const redis = new Redis({ host: 'redis' });

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/set', (req, res) => {
  redis.set("foo", "bar", function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/get', (req, res) => {
  redis.get("foo", function (err, result) {
    if (err) {
      res.send(err);
    } else {
      if (result === null) {
        res.send('No data');
      } else {
        res.send(result);
      }
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);