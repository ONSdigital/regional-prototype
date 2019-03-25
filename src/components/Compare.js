import React, {Component} from 'react';
import { getGeoJSON } from '../api/RequestHandler';
import CompareEarningsData from './CompareData/CompareEarningsData';
import ComparePartTimeEarningsData from './CompareData/ComparePartTimeEarningsData';
import CompareWellBeingData from './CompareData/CompareWellBeingData';
import CompareGenderPayGapData from './CompareData/CompareGenderPayGapData';
import MapContainer from './MapContainer';
import {polygon} from '@turf/helpers';
import turf from 'turf-extent';

class Compare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places: [],
      localAuths: [],
      loaded: false
    }
  }

  async componentDidMount() {

    let that = this;
    let ids = this.props.match.params.id.split("&")

    await getGeoJSON()
      .then((response) => {
        this.setState({
          places: response.features
        })
      })

    await this.state.places.forEach(function(place) {
      ids.forEach(function(item) {
        if(place.properties.lad18cd === item) {
          that.setState({
            [item]: {
              polygon: place.geometry.coordinates,
              mapCenter: [place.properties.long, place.properties.lat]
            },
            localAuths: [
              ...that.state.localAuths,
              {label: place.properties.lad18nm, id: place.properties.lad18cd}
            ]
          })
        } else {
          return null
        }
      })
    })


    let pg, size

    await ids.forEach(function(item) {
      if(that.state[item]) {
        pg = polygon(that.state[item].polygon)
        size = turf(pg)
      }

      that.setState({
        [item]: {
          ...that.state[item],
          zoom: size
        }
      })
    })

    this.setState({
      loaded: true
    })
  }
  render() {
    return(
      <div>
        <div className="compare-title">
          <div className="container">
            <h1>Compare Local Authorities</h1>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-md-center">
            {this.state.localAuths.map((item, key) =>
              <div key={key} className="col map-card">
                {this.state.loaded && this.state[item.id].polygon ?
                  <div className="map-div">
                    <h2>{item.label}</h2>
                    <MapContainer container={item.id} polygon={this.state[item.id].polygon} mapCenter={this.state[item.id].mapCenter} zoom={this.state[item.id].zoom}/>
                  </div>
                   : <div className="map">Loading map...</div>}
              </div>
            )}
          </div>
          <div className="col-12">
            <h2>Full-Time Earnings</h2>
          </div>
          <div className="row justify-content-md-center">
            {this.state.loaded ? <CompareEarningsData localAuth={this.state.localAuths} /> : null}
          </div>
          <div className="col-12">
            <h2>Part-Time Earnings</h2>
          </div>
          <div className="row justify-content-md-center">
            {this.state.loaded ? <ComparePartTimeEarningsData localAuth={this.state.localAuths} /> : null}
          </div>
          <div className="col-12">
            <h2>Well-Being</h2>
          </div>
          <div className="row justify-content-md-center">
            {this.state.loaded ? <CompareWellBeingData localAuth={this.state.localAuths} /> : null}
          </div>
          <div className="col-12">
            <h2>Gender Pay Gap</h2>
          </div>
          <div className="row justify-content-md-center">
            {this.state.loaded ? <CompareGenderPayGapData localAuth={this.state.localAuths} /> : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Compare
