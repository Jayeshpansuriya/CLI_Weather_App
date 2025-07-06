import fetch from "node-fetch"; // if using Node <18, make sure you install it
import readline from "readline/promises";
import chalk from "chalk";
import { stdin, stdout } from "process";

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

const API_KEY = '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = async (city) => {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found. Please check the city name.");
    }

    const weatherdata = await response.json();

    console.log(chalk.blue('\nWeather Information:'));
    console.log(`City: ${chalk.green(weatherdata.name)}`);
    console.log(`Temperature: ${chalk.yellow(weatherdata.main.temp)}°C`);
    console.log(`Description: ${chalk.cyan(weatherdata.weather[0].description)}`);
    console.log(`Humidity: ${chalk.magenta(weatherdata.main.humidity)}%`);
    console.log(`Wind Speed: ${chalk.red(weatherdata.wind.speed)} m/s\n`);
    
  } catch (error) {
    console.log(chalk.red(error.message));
  }
};

const city = await rl.question("Enter a city name to get its weather: ");
await getWeather(city);
rl.close();
