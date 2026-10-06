export default async function WeatherPage() {
  const apiKey = '0ba64c0782696efac242b17d43b58a37';
  const city = 'Hanoi';

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  );
  const weather = await res.json();

  return (
    <div>
      <h1>Thời tiết hiện tại</h1>
      <p>Thành phố: {weather.name}</p>
      <p>Nhiệt độ: {weather.main.temp}°C</p>
      <p>Mô tả: {weather.weather[0].description}</p>
    </div>
  );
}