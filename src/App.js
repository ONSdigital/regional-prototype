import React, { Component } from 'react';
import './assets/css/main.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getCodes, getGeoJSON } from './api/RequestHandler';
import Warning from './components/Warning';
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

      this.setState({
        localAuthorities: [
          ...this.state.localAuthorities,
          {label: 'Greater Manchester', id: 'E11000001'},
          {label: 'Merseyside', id: 'E11000002'}
        ]
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
        <Warning />
          <Header />
          <Switch>
            <Route exact path="/" component={() => <div><Search localAuthorities={this.state.localAuthorities} /><HeatmapsContainer places={this.state.data} loaded={this.state.loaded} /></div>} />
            <Route path="/local-authority/:id/:region" render={(props, match) => <Region {...props} />} />
            <Route exact path="/compare/:id" render={(props, match) => <Compare {...props} places={this.state.places} />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
