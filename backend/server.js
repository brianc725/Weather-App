'use strict';

const express = require('express');
const Redis = require("ioredis");
const fetch = require('node-fetch');
var moment = require('moment');
var cors = require('cors')

require('dotenv').config()

const redis = new Redis({ host: 'redis' });

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(cors());

async function getWeather(req, res) {
  const { zipCode, units } = req.params;
  const { WEATHER_API_KEY } = process.env;

  const key = zipCode + units;

  const weatherURL = `http://api.openweathermap.org/data/2.5/weather?appid=${WEATHER_API_KEY}&zip=${zipCode}&units=${units}`;
  await fetch(weatherURL)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Error from API call to OpenWeatherMap');
      }
      return response.json();
    })
    .then((data) => {
      const result = JSON.stringify(data);

      // Store in redis with expiration of seconds until midnight
      const secondsTillMidnight = moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds');
      redis.set(key, result, "EX", secondsTillMidnight);

      res.send(result);
    })
    .catch((error) => {
      res.status(500).send(JSON.stringify(error.message));
    });
}

function redisCacher(req, res, next) {
  const { zipCode, units } = req.params;

  const key = zipCode + units;

  redis.get(key, (err, value) => {
    if (err) throw err;

    if (value !== null) {
      // Value is already JSON stringified data from before
      res.send(value);
    } else {
      next();
    }
  });
}

app.get('/api/weather/:zipCode/:units', redisCacher, getWeather)

app.get('/', (req, res) => {
  res.send('Weather Application API');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);