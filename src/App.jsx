/* eslint-disable no-unused-vars */
import { useState } from 'react';
import './App.css';

const api = {
  key: "919193028e3568b3d9b6ed289099acd3",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null); // To handle errors

  const search = (event) => {
    if (event.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then(res => {
          if (!res.ok) throw new Error("City not found");
          return res.json();
        })
        .then(data => {
          setWeather(data);
          setQuery('');
          setError(null); // Clear any previous errors
          console.log(data);
        })
        .catch(err => {
          setError(err.message); // Set error message
          setWeather({});
        });
    }
  };

  const dateBuilder = (d) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    <div>
      <main>
        <div className='search-bar-container'>
          <input 
            type='text' 
            className='search-bar' 
            placeholder='Search...' 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            onKeyPress={search} 
          />
        </div>

        {error && <div className="error">{error}</div>} {/* Display error message */}

        {weather.main && (
          <div>
            <div className='location-box'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>
                {dateBuilder(new Date())}
              </div>
            </div>

            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weather.main.temp)}°C
              </div>
              <div className='weather'>
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
