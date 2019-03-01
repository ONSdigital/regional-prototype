import React, { Component } from 'react';
import './assets/css/main.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getCodes, getGeoData, getGeoJSON } from './api/RequestHandler';
import Header from './components/Header';
import Search from './components/Search';
import Region from './components/Region';
import Footer from './components/Footer';
import Compare from './components/Compare';
import HeatmapsContainer from './components/HeatmapsContainer';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      localAuthorities: [],
      places: [],
      loaded: false
    }
  }

  async componentDidMount() {
    await getCodes()
      .then((response) => {
        this.setState({
          localAuthorities: response.items.map(function(item) { return {label:item.label, id:item.id}})
        })
      })

    await getGeoData()
      .then((response) => {
        this.setState({
          places: response.features
        })
      })

    await getGeoJSON()
      .then((response) => {
        this.setState({
          data: response.features
        })
      })

    this.setState({
      loaded: true
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={() => <div><Search localAuthorities={this.state.localAuthorities} /><HeatmapsContainer places={this.state.data} loaded={this.state.loaded} /></div>} />
            <Route path="/local-authority/:region" render={(props) => <Region {...props} places={this.state.places} />} />
            <Route exact path="/compare" render={(props) => <Compare {...props} places={this.state.places} />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
