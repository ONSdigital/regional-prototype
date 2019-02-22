import React, {Component} from 'react';
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
      loaded: false
    }
  }

  async componentDidMount() {

    let that = this;

    await this.props.places.forEach(function(place) {
      that.props.location.state.map((item, key) =>
        place.attributes.lad18cd === item.id ?
          that.setState({
            [item.label]: {
              polygon: place.geometry.rings,
              mapCenter: [place.attributes.long, place.attributes.lat]
            }

          }) : null
        )
    })


    let pg, size

    await this.props.location.state.map((item) => {
      if(this.state[item.label]) {
        pg = polygon(that.state[item.label].polygon)
        size = turf(pg)
      }

      this.setState({
        [item.label]: {
          ...this.state[item.label],
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
            {this.props.location.state.map((item, key) =>
              <div key={key} className="col map-card">
                {this.state.loaded && this.state[item.label].polygon ?
                  <div>
                    <h2>{item.label}</h2>
                    <MapContainer container={item.id} polygon={this.state[item.label].polygon} mapCenter={this.state[item.label].mapCenter} zoom={this.state[item.label].zoom}/>
                  </div>
                   : <div className="">Loading map...</div>}
              </div>
            )}
          </div>
          <div className="col-12">
            <h2>Full-Time Earnings</h2>
          </div>
          <div className="row justify-content-md-center">
            <CompareEarningsData localAuth={this.props.location.state} />
          </div>
          <div className="col-12">
            <h2>Part-Time Earnings</h2>
          </div>
          <div className="row justify-content-md-center">
            <ComparePartTimeEarningsData localAuth={this.props.location.state} />
          </div>
          <div className="col-12">
            <h2>Well-Being</h2>
          </div>
          <div className="row justify-content-md-center">
            <CompareWellBeingData localAuth={this.props.location.state} />
          </div>
          <div className="col-12">
            <h2>Gender Pay Gap</h2>
          </div>
          <div className="row justify-content-md-center">
            <CompareGenderPayGapData localAuth={this.props.location.state} />
          </div>
        </div>
      </div>
    )
  }
}

export default Compare
