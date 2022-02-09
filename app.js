const express = require('express');
const app = express();
const port = 3000;

const https = require('https');

app.get('/', (reqToMyServer, resFromMyServer) => {
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=kiev&appid=9438d0365d89ead3ff23a96473494c23&units=metric';
  https.get(url, function (resFromWeatherAPI) {
    console.log(resFromWeatherAPI.statusCode); //200
    resFromWeatherAPI.on('data', (data) => {
      // process.stdout.write(data);
      const weatherData = JSON.parse(data);
      // console.log(weatherData.main);
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      // console.log(temperature);
      // console.log(description);
      const icon = weatherData.weather[0].icon;
      // console.log('icon: ', icon);
      const iconURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
      // console.log('iconURL: ', iconURL);

      resFromMyServer.write(
        `<h1>The temperature in Kiev is ${temperature}'C</h1>`
      );
      resFromMyServer.write(`<h2>The weather is currently ${description}</h2>`);
      resFromMyServer.write(`<img src=${iconURL}>`);
      resFromMyServer.send();
    });
  });
});

app.listen(port, () => {
  console.log(`Weather App listening on port ${port}`);
});
