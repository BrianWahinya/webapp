import { useEffect, useState } from "react";
import { Loader, Breadcrumbs } from "../../components";
import WeatherDisplay from "./weatherdisplay";
import "./css/weather.css";

export default function Weather() {
  const [location, setLocation] = useState("Nairobi");
  const [weatherData, setWeatherData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch function
  const dataFetch = () => {
    const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
    fetch(
      encodeURI(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weather_api_key}&units=metric`,
      ),
    )
      .then((data) => data.json())
      .then((jsondata) => {
        // console.log(jsondata);
        setLoading(false);
        if (parseInt(jsondata.cod) >= 200 && parseInt(jsondata.cod) < 300) {
          setWeatherData([jsondata]);
          setErrors([]);
        } else {
          setErrors(["Invalid Location: Enter a valid location"]);
        }
        setLocation("");
      })
      .catch((err) => {
        setLoading(false);
        setErrors(["An error occurred in loading the data"]);
      });
  };

  // Event listener
  const getWeather = (event) => {
    setWeatherData([]);
    setErrors([]);
    if (event.key === "Enter" || event.type === "click") {
      setLoading(true);
      switch (true) {
        case location === "":
          setErrors(["Please Enter a location"]);
          setLoading(false);
          break;
        default:
          dataFetch();
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    dataFetch();
  }, []);

  return (
    <>
      <Breadcrumbs crumbs={["home", "app", "weather"]} />
      <div className="weather">
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={getWeather}
        />
        <button className="btn btn-sm btn-outline-info" onClick={getWeather}>
          Submit
        </button>
        <br />

        {loading ? (
          <Loader />
        ) : (
          <>
            {weatherData.length > 0 ? (
              <WeatherDisplay data={weatherData} />
            ) : (
              ""
            )}
            {errors.length > 0
              ? errors.map((err, index) => <p key={index}>{err}</p>)
              : ""}
          </>
        )}
      </div>
    </>
  );
}
