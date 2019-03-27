import React, { Component } from 'react';
import {getLocalWellBeing} from '../../api/RequestHandler';
import * as ss from 'simple-statistics';

class WellbeingHeatmap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      dataWellBeing: {},
      legend: [],
      loaded: false
    }
  }

  async componentDidMount() {
    let count = 0
    let that = this
    let data = []

    await getLocalWellBeing("*", "average-mean", this.props.measure)
      .then((response) => {
        this.setState({
          dataWellBeing: response.observations
        })
      })

    this.props.data.forEach(function(place, index) {
      that.state.dataWellBeing.forEach(function(item) {
        if(item.dimensions.geography.id === 'S12000024') {
          item.dimensions.geography.id = 'S12000048'
        }
        if(item.dimensions.geography.id === 'S12000015') {
          item.dimensions.geography.id = 'S12000047'
        }
        if(item.dimensions.geography.id === place.properties.lad18cd) {
          data.push({type: place.type, geometry: {type: place.geometry.type, coordinates: place.geometry.coordinates}, properties: {objectid: place.properties.objectid, lad18cd: place.properties.lad18cd, lad18nm: place.properties.lad18nm, lad18nmw: place.properties.lad18nmw, bng_e: place.properties.bng_e, bng_n: place.properties.bng_n, lat: place.properties.lat, long: place.properties.long, st_areashape: place.properties.st_areashape, st_lengthshape: place.properties.st_lengthshape, density: Number(item.observation)}})
        }
      })
    })
    that.setState({
      data: {
        type: "FeatureCollection",
        features: data
      }
    })

    let array = this.state.data.features.map((item) => item.properties.density)
    console.log(array)

    this.setLegend(ss.ckmeans(array, 7))
    let stops = that.getColor(ss.ckmeans(array, 7))

    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGFlbHJveW5vcnRvbiIsImEiOiJjanI5MGs3aWcwMnFvNGFsOWE3NTl2ZWR4In0.wm4DHL_Gb3gGIj7k8VSkgQ';
    var map = new mapboxgl.Map({
      container: `${this.props.measure}-wellbeing`,
      style: 'mapbox://styles/michaelroynorton/cjr932llm00h52tpeao9pjk5u',
      center: [-3.681966,55.580291],
      zoom: 4
    })

    await map.on('load', function () {
        map.addLayer({
            'id': 'wellbeing',
            'type': 'fill',
            'source': {
              'type': 'geojson',
              'data': that.state.data
            },
            'paint': {
              'fill-color': {
                property: 'density',
                stops: stops
              },
              'fill-opacity': 1,
              'fill-outline-color': '#000000'
            }
        });

        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        map.on('mousemove', 'wellbeing', function(e) {

          map.getCanvas().style.cursor = 'pointer';

          var coordinates = [e.features[0].properties.long, e.features[0].properties.lat ];
          var description = ''
          if (e.features[0].properties.density === 0) {
            description = `<h3>${e.features[0].properties.lad18nm}</h3>No data`;
          } else {
            description = `<h3>${e.features[0].properties.lad18nm}</h3><h4>${e.features[0].properties.density}</h4>`;
          }

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }


          popup.setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
        });

        map.on('mouseleave', 'wellbeing', function() {
          map.getCanvas().style.cursor = '';
          popup.remove();
        });
    })

    this.setState({
      loaded: true
    })
  }

  getColor(array) {
    let stops = [[array[0][0], '#bdbdbd'], [array[1][0], '#e0ecf4'], [array[2][0], '#bfd3e6'], [array[3][0], '#9ebcda'], [array[4][0], '#8c96c6'], [array[5][0], '#8c6bb1'], [array[6][0], '#88419d']]
    return stops
  }

  setLegend(array) {
    this.setState({
      legend: [
        {key: `No data`, color: '#bdbdbd'},
        {key: `${Number(array[1][0]).toFixed(2)} - ${Number(array[2][0] - 0.01).toFixed(2)}`, color: '#e0ecf4'},
        {key: `${Number(array[2][0]).toFixed(2)} - ${Number(array[3][0] - 0.01).toFixed(2)}`, color: '#bfd3e6'},
        {key: `${Number(array[3][0]).toFixed(2)} - ${Number(array[4][0] - 0.01).toFixed(2)}`, color: '#9ebcda'},
        {key: `${Number(array[4][0]).toFixed(2)} - ${Number(array[5][0] - 0.01).toFixed(2)}`, color: '#8c96c6'},
        {key: `${Number(array[5][0]).toFixed(2)} - ${Number(array[6][0] - 0.01).toFixed(2)}`, color: '#8c6bb1'},
        {key: `${Number(array[6][0]).toFixed(2)} +`, color: '#88419d'},
      ]
    })
  }

  render() {
    return (
        <div id={this.props.measure + "-wellbeing"} className="map">
          {this.state.loaded ?
             <div className="legend">
               {this.state.legend.map((item, key) => <div key={key}><span className="key" style={{backgroundColor: `${item.color}`}}></span><span className="range">{item.key}</span></div>)}
             </div>
         : null}
        </div>
    );
  }
}

export default WellbeingHeatmap;
