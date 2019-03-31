import React, { Component } from 'react';
import { getGeoJSON } from '../api/RequestHandler';
import MapContainer from './MapContainer';
import ChartTab from './ChartTab';
import {polygon} from '@turf/helpers';
import turf from 'turf-extent';
import { Link } from 'react-router-dom';

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

    await getGeoJSON()
      .then((response) => {
        this.setState({
          places: response.features
        })
      })

    this.state.places.forEach(function(place) {
      if(place.properties.lad18cd === that.props.match.params.id) {
        if(place.geometry.type === 'MultiPolygon') {
          that.setState({
            localAuthLabel: place.properties.lad18nm,
            polygon: place.geometry.coordinates[0],
            mapCenter: [place.properties.long, place.properties.lat]
          })
        } else {
          that.setState({
            localAuthLabel: place.properties.lad18nm,
            polygon: place.geometry.coordinates,
            mapCenter: [place.properties.long, place.properties.lat]
          })
        }
      }
    })

    if(that.props.match.params.id === 'E11000001') {
      this.setState({
        localAuthLabel: 'Greater Manchester'
      })
    } else if (that.props.match.params.id === 'E11000002') {
      this.setState({
        localAuthLabel: 'Merseyside'
      })
    }

    var pg = polygon(this.state.polygon)
    var size = turf(pg)

    this.setState({
      loaded: true,
      zoom: size
    })

  }

  render() {
    return (
      <div>
        <nav>
          <div className="breadcrumb print--hide">
            <div className="container">
              <ol className="breadcrumb__list">
                <li className="breadcrumb__item">
                  <Link className="breadcrumb__link" to="/">
                      Home
                  </Link>
                </li>
                <li className="breadcrumb__item">
                    {this.state.localAuthLabel}
                </li>
              </ol>
            </div>
          </div>
        </nav>
        {this.state.loaded ?
          <div>
            {this.state.polygon.length > 0 ? <MapContainer container={this.props.match.params.id} polygon={this.state.polygon} mapCenter={this.state.mapCenter} zoom={this.state.zoom}/> : null}
          </div>
          :
          <div className="map-placeholder">
            <p>Loading map data for {this.props.match.params.region}...</p>
          </div>
        }
        <div className={this.state.polygon.length || this.state.loaded > 0 ? "region-info" : "no-map-region-info"}>
          <h1>{this.state.localAuthLabel}</h1> <h2> ({this.props.match.params.id})</h2>
        </div>
        <ChartTab localAuthLabel={this.state.localAuthLabel} localAuth={this.props.match.params.id} />
      </div>
    )
  }
}

export default Region;
