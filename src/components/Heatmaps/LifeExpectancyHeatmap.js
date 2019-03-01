import React, { Component } from 'react';
import {getLifeExpectancy, getLifeExpectancyFemale} from '../../api/RequestHandler';

class LifeExpectancyHeatmap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      dataLE: {}
    }
  }

  async componentDidMount() {
    let count = 0
    let that = this
    let data = []

    await getLifeExpectancy(this.props.gender)
      .then((response) => {
        this.setState({
          dataLE: response.observations
        })
      })

    this.props.data.forEach(function(place, index) {
      that.state.dataLE.forEach(function(item) {
        if(item.dimensions.geography.id === place.properties.lad18cd) {
          data.push({type: place.type, geometry: {type: place.geometry.type, coordinates: place.geometry.coordinates}, properties: {objectid: place.properties.objectid, lad18cd: place.properties.lad18cd, lad18nm: place.properties.lad18nm, lad18nmw: place.properties.lad18nmw, bng_e: place.properties.bng_e, bng_n: place.properties.bng_n, lat: place.properties.lat, long: place.properties.long, st_areashape: place.properties.st_areashape, st_lengthshape: place.properties.st_lengthshape, density: item.observation}})
        }
      })
    })
    that.setState({
      data: data
    })

    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGFlbHJveW5vcnRvbiIsImEiOiJjanI5MGs3aWcwMnFvNGFsOWE3NTl2ZWR4In0.wm4DHL_Gb3gGIj7k8VSkgQ';
    var map = new mapboxgl.Map({
      container: `${this.props.gender}-life-expectancy`,
      style: 'mapbox://styles/michaelroynorton/cjr932llm00h52tpeao9pjk5u',
      center: [-3.681966,55.580291],
      zoom: 4
    })

    map.on('load', function () {
      that.state.data.forEach(function(place) {
        map.addLayer({
            'id': place.properties.objectid.toString(),
            'type': 'fill',
            'source': {
              'type': 'geojson',
              'data': place
            },
            'paint': {
              'fill-color': that.getColor(place.properties.density),
              'fill-opacity': 0.7,
              'fill-outline-color': '#000000'
            }
        });
      })
    });
  }

  getColor(d) {
  return d > 84 ? '#00441b' :
         d > 83 ? '#006d2c' :
         d > 82 ? '#238b45' :
         d > 81 ? '#41ae76' :
         d > 80 ? '#66c2a4' :
         d > 79 ? '#99d8c9' :
         d >= 1 ? '#ccece6' :
                  '#bdbdbd' ;
}

  render() {
    return (
        <div id={this.props.gender + "-life-expectancy"} className="map"></div>
    );
  }
}

export default LifeExpectancyHeatmap;
