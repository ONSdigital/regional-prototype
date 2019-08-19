import React, { Component } from 'react';
import {getPop} from '../../api/RequestHandler';
import * as ss from 'simple-statistics';

class PopulationHeatmap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      population: {},
      legend: [],
      loaded: false
    }
  }

  async componentDidMount() {
    let that = this
    let data = []

    await getPop('2017', '*', this.props.gender)
      .then((response) => {
        this.setState({
          population: response.observations
        })
      })

    this.props.data.forEach(function(place, index) {
      that.state.population.forEach(function(item) {
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

    this.setState({
      data: {
        type: "FeatureCollection",
        features: data
      }
    })

    let array = this.state.data.features.map((item) => item.properties.density)

    this.setLegend(ss.ckmeans(array, 7))
    let stops = that.getColor(ss.ckmeans(array, 7))

    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGFlbHJveW5vcnRvbiIsImEiOiJjanI5MGs3aWcwMnFvNGFsOWE3NTl2ZWR4In0.wm4DHL_Gb3gGIj7k8VSkgQ';
    var map = new mapboxgl.Map({
      container: `${this.props.gender}-population`,
      style: 'mapbox://styles/michaelroynorton/cjr932llm00h52tpeao9pjk5u',
      center: [-3.681966,55.580291],
      zoom: 4
    })

    map.on('load', function () {
        map.addLayer({
            'id': "pop",
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
              'fill-outline-color': '#ccc'
            }
        });

        map.on('mousemove', 'pop', function(e) {

          map.getCanvas().style.cursor = 'pointer';

          var coordinates = [e.features[0].properties.long, e.features[0].properties.lat ];
          var description = ''
          if (e.features[0].properties.density === "") {
            description = `<h3>${e.features[0].properties.lad18nm}</h3>No data`;
          } else {
            description = `<h3>${e.features[0].properties.lad18nm}</h3><h4>${Number(e.features[0].properties.density).toLocaleString('en')}</h4>`;
          }

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          popup.setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
        });

        map.on('mouseleave', 'pop', function() {
          map.getCanvas().style.cursor = '';
          popup.remove()
        });

        map.on('click', 'pop', function (e) {
          let urlSafeName = e.features[0].properties.lad18nm.replace(/ /g, "-")
          window.location.href = '/local-authority/' + e.features[0].properties.lad18cd + '/' + urlSafeName;
          });

        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });
    });

    this.setState({
      loaded: true
    })
  }

  getColor(array) {
    let stops = [[array[0][0], '#ccece6'], [array[1][0], '#99d8c9'], [array[2][0], '#66c2a4'], [array[3][0], '#41ae76'], [array[4][0], '#238b45'], [array[5][0], '#006d2c']]
    return stops
  }

  setLegend(array) {
    this.setState({
      legend: [
        {key: `No data`, color: '#bdbdbd'},
        {key: `${Number(array[0][0]).toLocaleString('en')} - ${(Number(array[1][0]) - 1).toLocaleString('en')}`, color: '#ccece6'},
        {key: `${Number(array[1][0]).toLocaleString('en')} - ${(Number(array[2][0]) - 1).toLocaleString('en')}`, color: '#99d8c9'},
        {key: `${Number(array[2][0]).toLocaleString('en')} - ${(Number(array[3][0]) - 1).toLocaleString('en')}`, color: '#66c2a4'},
        {key: `${Number(array[3][0]).toLocaleString('en')} - ${(Number(array[4][0]) - 1).toLocaleString('en')}`, color: '#41ae76'},
        {key: `${Number(array[4][0]).toLocaleString('en')} - ${(Number(array[5][0]) - 1).toLocaleString('en')}`, color: '#238b45'},
        {key: `${Number(array[5][0]).toLocaleString('en')} +`, color: '#006d2c'},
      ]
    })
  }

  render() {
    return (
        <div id={this.props.gender + "-population"} className="map">
          {this.state.loaded ?
             <div className="legend">
               {this.state.legend.map((item, key) => <div key={key}><span className="key" style={{backgroundColor: `${item.color}`}}></span><span className="range">{item.key}</span></div>)}
             </div>
         : null}
        </div>
    );
  }
}

export default PopulationHeatmap;
