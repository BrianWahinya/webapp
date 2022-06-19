export default function WeatherDisplay({ data }) {
  const { name, main, weather } = data[0];
  const { main: mainWeather, description: desc, icon } = weather[0];
  const { temp } = main;

  return (
    <div className="weatherDisplay">
      <h3>{name}</h3>
      <img src={`https://openweathermap.org/img/wn/${icon}@4x.png `} />
      <p>{mainWeather}</p>
      <p>{desc}</p>
      <p>Temp: {Math.floor(temp)}&deg;</p>
    </div>
  );
}
