import React from 'react';
import './Display.css'

const Display = ({ data }) => {
  const { temp, temp_min, temp_max } = data.main;
  const { speed, deg } = data.wind;
  const { main, description, icon } = data.weather.length !== 0 && data.weather[0];
  const { dt } = data;
  const date = new Date(dt*1000);

  const logoURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  const tempUnits = `\u00b0F`;
  const speedUnits = 'mph';

  return (
    <>
    <div className="display-container">
      <div className="display-name">{data.name}</div>
      <div className="display-temp-block">
        <div className="display-current">{temp}{tempUnits}</div>
        <div className="display-range">{temp_max}{tempUnits}/{temp_min}{tempUnits}</div>
      </div>
      <img  alt="Current Weather Icon" src={logoURL} className="display-img"/>
      <div className="display-msg">
        <div className="display-main">{main}</div>
        <div className="display-description">{description}</div>
      </div>
    </div>
    <div className="display-wind">Wind - {speed} {speedUnits} @ {deg} degrees</div>
    <footer className="display-update">Data as of {date.toString()}</footer>
    </>
  )
}

export default Display;