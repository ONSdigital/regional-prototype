import React, { Component } from 'react';
import MapContainer from './MapContainer';
import PopulationData from './Data/PopulationData';
import ChartTab from './ChartTab';

class Region extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      polygon: [],
      mapCenter: []
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

    this.setState({
      loaded: true
    })
  }

  render() {
    return (
      <div>
        {this.state.loaded ?
          <div>
            {this.state.polygon.length > 0 ? <MapContainer polygon={this.state.polygon} mapCenter={this.state.mapCenter}/> : <div className="map-placeholder"></div>}
            <div className="region-info">
              <h1>{this.props.location.state.label}</h1>
              <PopulationData localAuth={this.props.location.state.id}/>
            </div>
          </div>
          :
            <p>Loading map data for {this.props.location.state.label}...</p>
        }
        <ChartTab localAuth={this.props.location.state.id} />

      </div>
    )
  }
}

export default Region;
