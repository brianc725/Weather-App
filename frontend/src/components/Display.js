import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const Display = ({ data }) => {
  const { temp, temp_min, temp_max } = data.main;
  const { speed, deg } = data.wind;
  const { main, description, icon } = data.weather.length !== 0 && data.weather[0];
  const { dt } = data;
  const date = new Date(dt*1000);

  const logoURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="Display">
      <div className="display-name">{data.name}</div>
      <div className="display-current">Current temperature: {temp}</div>
      <div className="display-high">High: {temp_max}</div>
      <div className="display-low">Low: {temp_min}</div>
      <div className="display-main">{main}</div>
      <div className="display-description">{description}</div>
      <div className="display-wind">{speed} UNITS @ {deg} degrees</div>
      <div className="display-update">Data as of {date.toString()}</div>
      <Avatar alt="Current Weather Icon" src={logoURL} />
    </div>
  )
}

export default Display;