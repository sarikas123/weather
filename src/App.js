import "./styles.css";
import React, { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <h1>Weather Report</h1>
      <Weather />
    </div>
  );
}

function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
    country: ""
  });
  const APIKEY = "175bcca67d8d6865a2a976576819c41d";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.city === "") {
      alert("Add values");
    } else {
      const data = fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => setWeather({ data: data }));
    }
  };

  const handlechange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }
    if (name === "country") {
      setForm({ ...form, country: value });
    }
    //console.log(form.city, form.country);
  };

  const report = weather.data;

  return (
    <div>
      <span className="span1"></span>
      <form>
        <input
          type="text"
          name="city"
          placeholder="city"
          onChange={handlechange}
        />
        <input
          type="text"
          name="country"
          placeholder="country"
          onChange={handlechange}
        />
        <br />
        <button onClick={handleSubmit}>Get Report</button>
        <br />
        {weather.data !== undefined ? (
          <div>
            <h3>{new Date().toLocaleTimeString()}</h3>
            <h1>{report.main.temp}</h1>
            <h1>{report.main.pressure}</h1>

            <h1>{report.wind.speed}</h1>
            <h1>{report.wind.deg}</h1>
          </div>
        ) : null}
      </form>
    </div>
  );
}
