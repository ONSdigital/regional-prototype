import React, { Component } from 'react';
import { getGeoData } from '../api/RequestHandler';
import MapContainer from './MapContainer';
import PopulationData from './Data/PopulationData';
import ChartTab from './ChartTab';
import {polygon} from '@turf/helpers';
import turf from 'turf-extent'

class Region extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places: [],
      localAuthLabel: '',
      loaded: false,
      polygon: [],
      mapCenter: [],
      zoom: null
    }
  }

  async componentDidMount() {

    let that = this;

    await getGeoData()
      .then((response) => {
        this.setState({
          places: response.features
        })
      })

    this.state.places.forEach(function(place) {
      if(place.attributes.lad18cd === that.props.match.params.id) {
        that.setState({
          localAuthLabel: place.attributes.lad18nm,
          polygon: place.geometry.rings,
          mapCenter: [place.attributes.long, place.attributes.lat]
        })
      }
    })

    var pg = polygon(this.state.polygon)
    var size = turf(pg)

    this.setState({
      loaded: true,
      zoom: size
    })

  }

  render() {
    console.log(this.state)
    return (
      <div>
        {this.state.loaded ?
          <div>
            {this.state.polygon.length > 0 ? <MapContainer container={this.props.match.params.id} polygon={this.state.polygon} mapCenter={this.state.mapCenter} zoom={this.state.zoom}/> : <div className="map-placeholder"></div>}
          </div>
          :
          <div className="map-placeholder">
            <p>Loading map data for {this.props.match.params.region}...</p>
          </div>
        }
        <div className="region-info">
          <h1>{this.state.localAuthLabel}</h1>
        </div>
        <ChartTab localAuthLabel={this.state.localAuthLabel} localAuth={this.props.match.params.id} />
      </div>
    )
  }
}

export default Region;
