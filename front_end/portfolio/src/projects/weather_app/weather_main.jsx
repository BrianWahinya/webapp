import React, { useState } from "react";
import "../../styles/weather.css";

function Weather() {
  const { REACT_APP_OPENWEATHER_APIKEY } = process.env;
  console.log(process);
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${REACT_APP_OPENWEATHER_APIKEY}`,
      )
        .then((data) => data.json())
        .then((jsondata) => {
          // console.log(jsondata);
          setWeatherData(jsondata);
          setCity("");
          event.target.value = "";
        });
    }
  };

  const formatWeather = (data) => {
    // console.log(data);
    if (data.length !== 0) {
      if (data.name) {
        return (
          <>
            <h4>Country: {data.sys.country}</h4>
            <h5>Place: {data.name}</h5>
            <p>
              Wind =&gt; Speed:{data.wind.speed} Degree:{data.wind.deg} Gust:
              {data.wind.gust}
            </p>
            <p>
              <u>Condtions</u>
              <br />
              {data.weather.map((dw) => (
                <>
                  Main:{dw.main}.<br /> Description:{dw.description}.<br />{" "}
                  Icon:{dw.icon}
                </>
              ))}
            </p>
          </>
        );
      }
      return (
        <p>
          Error:{data.cod}.<br />
          Message:{data.message}
          <br />
          Advice: Kindly key in a valid city name
        </p>
      );
    }
    return <>Please enter a city</>;
  };

  return (
    <div className="divWeather">
      <input
        className="inputCity"
        placeholder="Enter City..."
        onKeyPress={getWeather}
        onChange={(e) => setCity(e.target.value)}
      />
      <div className="divCityWeather">{formatWeather(weatherData)}</div>
    </div>
  );
}

export default Weather;

/*
class Weather extends React.Component {


  render(){
    return <div>Weather App (Under Development) <br/> No hurry!!! &#128514; &#128514;</div>
  }
}

export default Weather;
*/
