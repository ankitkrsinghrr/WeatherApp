import React from 'react'
import './WeatherApp.css'
import search_icon from './search.png'
import clear_icon from './clear.png'
import cloud_icon from './cloud.png'
import drizzle_icon from './drizzle.png'
import humidity_icon from './humidity.png'
import rain_icon from './rain.png'
import wind_icon from './wind.png'
import snow_icon from './snow.png'
import{useState}from 'react'

const WeatherApp = () => {
    let api_key = "02800f1f7b521be59895983af77db54b";
    const[wicon,setWicon]=useState(cloud_icon)
    const search = async () => {
        let element = document.getElementsByClassName("cityInput");
        if (element[0].value === '') {
            return 0;
        }
        else {
            try {
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
                
                let response = await fetch(url);
                let data = await response.json();
    
                if (data.cod && data.cod !== 200) {
                    console.error("Error:", data.message);
                    return;
                }
    
                const humidity = document.getElementsByClassName("humidity-percent");
                const wind = document.getElementsByClassName("wind-speed");
                const temperature = document.getElementsByClassName("weather-temp");
                const location = document.getElementsByClassName("weather-location");
                if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n")
                {
                    setWicon(clear_icon);
                }
                else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n")
                {
                    setWicon(cloud_icon)
                }
                else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n")
                {
                    setWicon(drizzle_icon)
                }
                else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n")
                {
                    setWicon(drizzle_icon)
                }
                else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n")
                {
                    setWicon(rain_icon)
                }
                else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n")
                {
                    setWicon(rain_icon)
                }
                else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n")
                {
                    setWicon(snow_icon)
                }
    
                if (data.main && data.main.humidity) {
                    humidity[0].innerHTML = data.main.humidity+" % ";
                } else {
                    console.error("Humidity data not available");
                }
    
                if (data.wind && data.wind.speed) {
                    wind[0].innerHTML = data.wind.speed+" km/h";
                } else {
                    console.error("Wind speed data not available");
                }
    
                if (data.main && data.main.temp) {
                    temperature[0].innerHTML = data.main.temp+"°C";
                } else {
                    console.error("Temperature data not available");
                }
    
                if (data.name) {
                    location[0].innerHTML = data.name;
                } else {
                    console.error("Location data not available");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    }
    
  return (
      <div className='container'>
          <div className='top-bar'>
              <input type='text' className="cityInput" placeholder="Search" />
              <div className='search-icon' onClick={()=>{search()}}>
                  <img src={search_icon} alt=""/>
              </div>
              
          </div>
          <div className="weather-image">
              <img src={wicon}alt=""/>
          </div>
          <div className="weather-temp">24 °C</div>
          <div className="weather-location">London</div>
          <div className="data-container">
              <div className="element">
                  <img src={humidity_icon} alt="" className="icon" />
                  <div className="data">
                      <div className="humidity-percent">65%</div>
                      <div className="text">Humidity</div>
                      

                  </div>
              </div>

              <div className="element">
                  <img src={wind_icon} alt="" className="icon" />
                  <div className="data">
                      <div className="wind-speed">18 km/hr</div>
                      <div className="text">Wind Speed</div>
                      

                  </div>
              </div>
          </div>
     
    </div>
  )
}

export default WeatherApp