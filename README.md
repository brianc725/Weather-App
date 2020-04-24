# Weather Application

## Overview

Full stack weather application with third party API from OpenWeather.
Frontend is done with React with backend utilizing Node.js, Express,
and ioredis for Redis. Redis is used for caching results of current weather
and forecasts for the day, leading to fast access to already accessed
data and less API usage. The backend is tied together with Docker and Docker
Compose.

## Installation

