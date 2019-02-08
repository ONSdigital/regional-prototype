import React, { Component } from 'react';
import './assets/css/main.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getCodes, getGeoData } from './api/RequestHandler';
import Header from './components/Header';
import Search from './components/Search';
import Region from './components/Region';
import Footer from './components/Footer';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      localAuthorities: [],
      places: []
    }
  }

  componentDidMount() {
    getCodes()
      .then((response) => {
        this.setState({
          localAuthorities: response.items.map(function(item) { return {label:item.label, id:item.id}})
        })
      })

    getGeoData()
      .then((response) => {
        this.setState({
          places: response.features
        })
      })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
            <Switch>
              <Route exact path="/" component={() => <Search localAuthorities={this.state.localAuthorities} />} />
              <Route path="/:region" render={(props) => <Region {...props} places={this.state.places} />} />
            </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
