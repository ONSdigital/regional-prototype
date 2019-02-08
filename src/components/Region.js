import React, { Component } from 'react';
import MapContainer from './MapContainer';
import PopulationData from './Data/PopulationData';
import ChartTab from './ChartTab';
import area from '@turf/area';
import {polygon} from '@turf/helpers';

class Region extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      polygon: [],
      mapCenter: [],
      zoom: 8
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

    var pg = polygon(this.state.polygon)
    var size = area(pg)

    this.setState({
      loaded: true,
      zoom: Math.round(size)
    })

  }

  render() {
    return (
      <div>
        {this.state.loaded ?
          <div>
            {this.state.polygon.length > 0 ? <MapContainer polygon={this.state.polygon} mapCenter={this.state.mapCenter}/> : <div className="map-placeholder"></div>}
          </div>
          :
            <p>Loading map data for {this.props.location.state.label}...</p>
        }
        <div className="region-info">
          <h1>{this.props.location.state.label}</h1>
          <PopulationData localAuth={this.props.location.state.id}/>
        </div>
        <ChartTab localAuth={this.props.location.state.id} />
      </div>
    )
  }
}

export default Region;
