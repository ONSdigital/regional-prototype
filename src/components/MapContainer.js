import React, { Component } from 'react';

class MapContainer extends Component {

  componentDidMount() {

    let that = this

    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGFlbHJveW5vcnRvbiIsImEiOiJjanI5MGs3aWcwMnFvNGFsOWE3NTl2ZWR4In0.wm4DHL_Gb3gGIj7k8VSkgQ';
    var map = new mapboxgl.Map({
      container: this.props.container,
      style: 'mapbox://styles/michaelroynorton/cjr932llm00h52tpeao9pjk5u',
      center: that.props.mapCenter,
      zoom: 8
    })

    map.on('load', function () {
      map.addLayer({
          'id': 'maine',
          'type': 'fill',
          'source': {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates': that.props.polygon
              }
            }
          },
          'layout': {},
          'paint': {
            'fill-color': '#206095',
            'fill-opacity': 0.7,
            'fill-outline-color': '#000000'
          }
      });
    });

    map.fitBounds(this.props.zoom, {padding: 20});
    map.scrollZoom.disable();
  }

  render() {
    return (
        <div id={this.props.container} className="map"></div>
    );
  }
}

export default MapContainer;
