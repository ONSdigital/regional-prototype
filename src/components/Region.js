import React, { Component } from 'react';
import MapContainer from './MapContainer';

class Region extends Component {
  constructor(props) {
    super(props)
    this.state = {
      polygon: [],
      mapCenter: []
    }
  }

  componentDidMount() {
    let that = this;

    this.props.places.forEach(function(place) {
      if(place.attributes.lad18cd === that.props.location.state.id) {
        that.setState({
          polygon: place.geometry.rings,
          mapCenter: [place.attributes.long, place.attributes.lat]
        })
      }
    })
  }

  render() {
    console.log(this.props.places)
    return (
      <div>

        {this.state.polygon.length !== 0 ?
          <div>
            <MapContainer polygon={this.state.polygon} mapCenter={this.state.mapCenter}/>
            <div className="region-info">
              <h1>{this.props.location.state.label}</h1>
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
