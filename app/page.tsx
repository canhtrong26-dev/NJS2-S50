export default async function WeatherPage() {
  const apiKey = '0ba64c0782696efac242b17d43b58a37';
  const city = 'Hanoi';

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  );
  const weather = await res.json();

  const forecastRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
  );
  const forecastData = await forecastRes.json();

  const dailyForecast = forecastData.list.filter((item: any) =>
    item.dt_txt.includes('12:00:00')
  );

  return (
    <div
      className="min-h-screen p-6 text-white"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-[900px] mx-auto">

     
        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{weather.name}</h1>
            <p className="text-7xl font-bold text-orange-400 my-2">
              {Math.round(weather.main.temp)}°
            </p>
            <p className="text-gray-300">{weather.weather[0].description}</p>
          </div>
          <div className="text-right text-gray-300">
            <p>H: {Math.round(weather.main.temp_max)}° L: {Math.round(weather.main.temp_min)}°</p>
          </div>
        </div>

       
        <div className="grid grid-cols-2 gap-6">

          <div>
            <h2 className="text-lg font-bold mb-3">Weather details</h2>
            <div className="border border-gray-600 rounded-xl p-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-black/50 backdrop-blur-md p-3 rounded-lg text-center">
                  <p className="text-gray-400 text-xs">Feels like</p>
                  <p className="text-lg font-bold">{Math.round(weather.main.feels_like)}°</p>
                </div>
                <div className="bg-black/50 backdrop-blur-md p-3 rounded-lg text-center">
                  <p className="text-gray-400 text-xs">Wind</p>
                  <p className="text-lg font-bold">{weather.wind.speed} m/s</p>
                </div>
                <div className="bg-black/50 backdrop-blur-md p-3 rounded-lg text-center">
                  <p className="text-gray-400 text-xs">Humidity</p>
                  <p className="text-lg font-bold">{weather.main.humidity}%</p>
                </div>
                <div className="bg-black/50 backdrop-blur-md p-3 rounded-lg text-center">
                  <p className="text-gray-400 text-xs">UV</p>
                  <p className="text-lg font-bold">0</p>
                </div>
                <div className="bg-black/50 backdrop-blur-md p-3 rounded-lg text-center">
                  <p className="text-gray-400 text-xs">Visibility</p>
                  <p className="text-lg font-bold">{(weather.visibility / 1000).toFixed(0)} km</p>
                </div>
                <div className="bg-black/50 backdrop-blur-md p-3 rounded-lg text-center">
                  <p className="text-gray-400 text-xs">Pressure</p>
                  <p className="text-lg font-bold">{weather.main.pressure} hPa</p>
                </div>
              </div>
            </div>
          </div>

          
          <div>
            <h2 className="text-lg font-bold mb-3">5-day weather forecast</h2>
            <div className="border border-gray-600 rounded-xl p-4">
              <div className="flex justify-between">
                {dailyForecast.map((day: any) => {
                  const date = new Date(day.dt_txt);
                  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                  return (
                    <div key={day.dt} className="text-center">
                      <p className="text-gray-400 text-sm mb-2">{dayName}</p>
                      <p className="text-lg font-bold text-orange-400">{Math.round(day.main.temp_max)}°</p>
                      <p className="text-gray-400 mt-4">{Math.round(day.main.temp_min)}°</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}