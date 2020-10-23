import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header';
import Home from './components/Home';
import Features from './components/features';
import Footer from './components/footer';
import Calendar from './components/calendar';
import Details from './components/details';

import FetchData from './service/FetchData';
import './style.css';

class App extends React.Component {

  fetchData = new FetchData();

  state = {
    rocket: 'Falcon 1',
    rocketFeatures: null,
    rockets: [],
    company: null
  };

  
  componentDidMount() {
    this.updateRocket();
    this.updateCompany();
  };

  updateRocket() {
    this.fetchData.getRocket()
      .then(data => {
        this.setState({
          rockets: data.map(item => item.name)
        })

        return data;
      })
      .then(data => data
        .find(item => item.name === this.state.rocket))
      .then(rocketFeatures => this.setState({ rocketFeatures }));
  };

  changeRocket = rocket => {
    this.setState({
      rocket
    }, this.updateRocket);
  }

  updateCompany = () => {
    this.fetchData.getCompany()
      .then( company => this.setState({ company }))
  }

  render(){
    return (
      <BrowserRouter>
        <Header
          rocketsNames = { this.state.rockets }
          changeRocket = { this.changeRocket }
        />

        <Route exact path="/">
          {
            this.state.company &&
            <Home
              company = { this.state.company }
            />
          }
        </Route>

        <Route path="/rocket">
          {
            this.state.rocketFeatures &&
            <Features
              rocketFeatures = { this.state.rocketFeatures }
            />
          }
        </Route>
        
        <Route path="/calendar">
          <Calendar />
        </Route>

        <Route path="/details/:id" component={ Details } />

        {
          this.state.company &&
          <Footer
            links = { this.state.company.links }
          />
        }
      </BrowserRouter>
    )
  }
}

export default App;
