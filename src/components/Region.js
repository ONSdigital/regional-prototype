import React, { Component } from 'react';
import { getPop, getMalePop, getFemalePop } from '../api/RequestHandler';
import MapContainer from './MapContainer';
import PopulationChart from './PopulationChart';

class Region extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      polygon: [],
      mapCenter: [],
      m: {
        total: 0,
        m1: 0,
        m2: 0,
        m3: 0,
        m4: 0,
        m5: 0,
        m6: 0,
        m7: 0,
        m8: 0
      },
      f: {
        total: 0,
        f1: 0,
        f2: 0,
        f3: 0,
        f4: 0,
        f5: 0,
        f6: 0,
        f7: 0,
        f8: 0
      },
      total: 0
    }
  }

  sortPop(age, gender, pop) {
    if(age <= 10) {
      let range = "1";
      this.setState({
        [gender]: {
          ...this.state[gender],
          [gender + range]: this.state[gender][gender + range] + pop
        }
      })
    }
    if(age > 10 && age <= 20) {
      let range = "2";
      this.setState({
        [gender]: {
          ...this.state[gender],
          [gender + range]: this.state[gender][gender + range] + pop
        }
      })
    }
    if(age > 20 && age <= 30) {
      let range = "3";
      this.setState({
        [gender]: {
          ...this.state[gender],
          [gender + range]: this.state[gender][gender + range] + pop
        }
      })
    }
    if(age > 30 && age <= 40) {
      let range = "4";
      this.setState({
        [gender]: {
          ...this.state[gender],
          [gender + range]: this.state[gender][gender + range] + pop
        }
      })
    }
    if(age > 40 && age <= 50) {
      let range = "5";
      this.setState({
        [gender]: {
          ...this.state[gender],
          [gender + range]: this.state[gender][gender + range] + pop
        }
      })
    }
    if(age > 50 && age <= 60) {
      let range = "6";
      this.setState({
        [gender]: {
          ...this.state[gender],
          [gender + range]: this.state[gender][gender + range] + pop
        }
      })
    }
    if(age > 60 && age <= 70) {
      let range = "7";
      this.setState({
        [gender]: {
          ...this.state[gender],
          [gender + range]: this.state[gender][gender + range] + pop
        }
      })
    }
    if(age > 70 || age === "90+") {
      let range = "8";
      this.setState({
        [gender]: {
          ...this.state[gender],
          [gender + range]: this.state[gender][gender + range] + pop
        }
      })
    }
  }

  async componentDidMount() {


    let that = this;

    await this.props.places.forEach(function(place) {
      if(place.attributes.lad18cd === that.props.location.state.id) {
        that.setState({
          polygon: place.geometry.rings,
          mapCenter: [place.attributes.long, place.attributes.lat]
        })
      }
    })

    await getMalePop(that.props.location.state.id)
      .then((response) => {
        response.observations.forEach(function(age) {
          if(age.dimensions.age.id === 'total') {
            that.setState({
              m: {
                ...that.state.m,
                total: parseInt(age.observation, 10)
              }
            })
          }
          that.sortPop(age.dimensions.age.id, "m", parseInt(age.observation, 10))
        })
      })

    await getFemalePop(that.props.location.state.id)
      .then((response) => {
        response.observations.forEach(function(age) {
          if(age.dimensions.age.id === 'total') {
            that.setState({
              f: {
                ...that.state.f,
                total: parseInt(age.observation, 10)
              }
            })
          }
          that.sortPop(age.dimensions.age.id, "f", parseInt(age.observation, 10))
        })
      })

    await getPop(that.props.location.state.id)
      .then((response) => {
        response.observations.forEach(function(age) {
          if(age.dimensions.age.id === 'total') {
            that.setState({
              total:  parseInt(age.observation, 10)
            })
          }
        })
      })

    this.setState({
      loaded: true
    })
  }

  render() {
    console.log((this.state.f))
    return (
      <div>
        {this.state.loaded ?
          <div>
            {this.state.polygon.length > 0 ? <MapContainer polygon={this.state.polygon} mapCenter={this.state.mapCenter}/> : null}
            <div className="region-info">
              <h1>{this.props.location.state.label}</h1>
              <h3>Population: {this.state.total}</h3>
              <PopulationChart totalPop={this.state.total} malePop={this.state.m} femalePop={this.state.f}/>
            </div>
          </div>
          :
            <p>Loading map data for {this.props.location.state.label}...</p>
        }
      </div>
    )
  }
}

export default Region;
