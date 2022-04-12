import { useEffect, useState } from "react";
import useFetch from "../utilities/useFetch";

export default function Weather() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch function
  const dataFetch = () => {
    const api_key = "8eb55a96ece5e22178e4ee3b81bced85";
    fetch(
      encodeURI(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`,
      ),
    )
      .then((data) => data.json())
      .then((jsondata) => {
        console.log(jsondata);
        if (parseInt(jsondata.cod) >= 200 && parseInt(jsondata.cod) < 300) {
          setWeatherData([jsondata]);
          setErrors([]);
          setLoading(false);
        } else {
          setErrors(["Invalid Location: Enter a valid location"]);
          setLoading(false);
        }
        setLocation("");
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

  return (
    <>
      <h5>Weather app</h5>
      <input
        type="text"
        placeholder="Enter Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyPress={getWeather}
      />
      <button onClick={getWeather}>Submit</button>
      {weatherData.length > 0 ? <code>{JSON.stringify(weatherData)}</code> : ""}
      {errors.length > 0 ? errors.map((err) => <p>{err}</p>) : ""}
      {loading ? <p>Loading...</p> : ""}
    </>
  );
}
