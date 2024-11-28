import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("Toronto");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "5255243fe62dec7bb9af0c67a332215a";  // Your API key

  // Fetch weather data from OpenWeatherMap API
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        setError("City not found. Please try again.");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  // Handle city input change
  const handleChange = (event) => {
    setCity(event.target.value);
  };

  // Handle city search
  const handleSearch = () => {
    if (city.trim() !== "") {
      setCity(city);
    }
  };

  // Render the weather data or loading/error state
  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading weather data...</p>}
      {error && <p>{error}</p>}

      {weatherData && !loading && !error && (
        <div className="weather-container">
          <h2>{weatherData.name}</h2>
          <div className="weather-info">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <div className="weather-details">
              <p>{weatherData.weather[0].description}</p>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}

      <div className="date-time">
        <p>{new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default App;
