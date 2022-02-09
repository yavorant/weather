const express = require('express');
const app = express();
const port = 3000;

const https = require('https');

app.get('/', (reqToMyServer, resFromMyServer) => {
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=kiev&appid=9438d0365d89ead3ff23a96473494c23&units=metric';
  https.get(url, function (resFromWeatherAPI) {
    console.log(resFromWeatherAPI);
  });
  resFromMyServer.send('Hello Aliens!');
});

app.listen(port, () => {
  console.log(`Weather App listening on port ${port}`);
});
