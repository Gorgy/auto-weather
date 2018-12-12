import React, { Component } from 'react';
// import logo from './logo.svg';
// import 'bootstrap/dist/css/bootstrap.css';
import "bootswatch/paper/bootstrap.css";
import './App.css';
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const PLACES = [
  { name: "Nizhniy Novgorod", zip: "603000" },
  { name: "Moscow", zip: "101000" },
  { name: "Saint-Petersburg", zip: "187021" },
  { name: "Tokio", zip: "100-0001" }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace : 0
    }
  }

  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>React Simple Weaver App</Navbar.Brand>
          </Navbar.Header>
        </Navbar>

        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Select a city</h3>
              <Nav
                  bsStyle="pills"
                  stacked
                  activeKey={activePlace}
                  onSelect={index => {
                    this.setState({ activePlace: index });
                  }}
              >
                {PLACES.map((place, index) => (
                    <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

class WeatherDisplay extends Component{
  constructor(){
    super();
    this.state = {
      weatherData : null
    }
  }

  componentDidMount() {
    const zipProp = this.props.zip;
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${zipProp}&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial`;
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }

  render() {
    const weatherData = this.state.weatherData;
    console.log(weatherData);
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
        <div>
          <h1>
            {weather.main} in {weatherData.name}
            <img src={iconUrl} alt={weatherData.description} />
          </h1>
          <p>Current: {FtoC(weatherData.main.temp)}</p>
          <p>Temp Max: {FtoC(weatherData.main.temp_max)}</p>
          <p>Temp Min: {FtoC(weatherData.main.temp_min)}</p>
          <p>Wind Speed: {MiToM(weatherData.wind.speed)}</p>
        </div>
    );
  }
}

let FtoC = (fTemp) => {
    let cTemp = ((fTemp - 32) / 1.8).toFixed(0);
    return cTemp + '°C';
};

let MiToM = (millies) => {
    let km = millies / 0.62137; // mi/h to km/h
    let meter = (km * 10 / 36).toFixed(0); // km/h to m/sec
    return meter + ' m/sec';
};

export default App;
