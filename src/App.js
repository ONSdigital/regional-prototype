import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getCodes, getGeoData } from './api/RequestHandler';
import Header from './components/Header';


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
        </div>
      </Router>
    );
  }
}

export default App;
