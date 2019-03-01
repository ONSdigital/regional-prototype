import React, { Component } from 'react';
import {getAllEarnings} from '../../api/RequestHandler';
import * as ss from 'simple-statistics';

class EarningsHeatmap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      dataEarnings: {}
    }
  }

  async componentDidMount() {
    let count = 0
    let that = this
    let data = []

    await getAllEarnings("*", this.props.gender, this.props.pattern, this.props.table)
      .then((response) => {
        this.setState({
          dataEarnings: response.observations
        })
      })

    console.log(this.state)
    debugger

    this.props.data.forEach(function(place, index) {
      that.state.dataEarnings.forEach(function(item) {
        if(item.dimensions.Geography.id === place.properties.lad18cd) {
          data.push({type: place.type, geometry: {type: place.geometry.type, coordinates: place.geometry.coordinates}, properties: {objectid: place.properties.objectid, lad18cd: place.properties.lad18cd, lad18nm: place.properties.lad18nm, lad18nmw: place.properties.lad18nmw, bng_e: place.properties.bng_e, bng_n: place.properties.bng_n, lat: place.properties.lat, long: place.properties.long, st_areashape: place.properties.st_areashape, st_lengthshape: place.properties.st_lengthshape, density: item.observation}})
        }
      })
    })

    that.setState({
      data: data
    })


    let array = this.state.dataEarnings.map((item) => item.observation)

    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGFlbHJveW5vcnRvbiIsImEiOiJjanI5MGs3aWcwMnFvNGFsOWE3NTl2ZWR4In0.wm4DHL_Gb3gGIj7k8VSkgQ';
    var map = new mapboxgl.Map({
      container: `${this.props.gender}-${this.props.pattern}-earnings`,
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
              'fill-color': that.getColor(place.properties.density, ss.ckmeans(array, 7)),
              'fill-opacity': 0.7,
              'fill-outline-color': '#000000'
            }
        });
      })
    });
  }

  getColor(d, array) {
  return d > array[6][0]  ? '#08589e' :
         d > array[5][0]  ? '#2b8cbe' :
         d > array[4][0]  ? '#4eb3d3' :
         d > array[3][0]  ? '#7bccc4' :
         d > array[2][0]  ? '#a8ddb5' :
         d >= array[1][0] ? '#ccebc5' :
                            '#f0f9e8' ;
}

  render() {
    return (
        <div id={this.props.gender + "-" + this.props.pattern + "-earnings"} className="map"></div>
    );
  }
}

export default EarningsHeatmap;
