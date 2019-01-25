import React, { Component } from 'react';
import { getMalePop } from '../api/RequestHandler';

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      malePop: 0,
      m1: {
        total: 0,
        scaled: 0
      },
      m2: {
        total: 0,
        scaled: 0
      },
      m3: {
        total: 0,
        scaled: 0
      },
      m4: {
        total: 0,
        scaled: 0
      },
      m5: {
        total: 0,
        scaled: 0
      },
      m6: {
        total: 0,
        scaled: 0
      },
      m7: {
        total: 0,
        scaled: 0
      },
      m8: {
        total: 0,
        scaled: 0
      },
      m9: {
        total: 0,
        scaled: 0
      },
      m10: {
        total: 0,
        scaled: 0
      }
    }
  }

  componentDidMount() {

    let that = this

    getMalePop()
      .then((response) => {
        this.setState({
          malePop: response.observations
        })
        response.observations.forEach(function(age) {
          if(age.dimensions.age.label <= 10) {
            that.setState({
              m1: {total: that.state.m1.total + parseInt(age.observation, 10), scaled: that.state.m1.scaled + parseInt(age.observation, 10) / 1000}
            })
          }
          if(age.dimensions.age.label <= 20) {
            that.setState({
              m2: {total: that.state.m2.total + parseInt(age.observation, 10), scaled: that.state.m2.scaled + parseInt(age.observation, 10) / 1000}
            })
          }
          if(age.dimensions.age.label <= 30) {
            that.setState({
              m3: {total: that.state.m3.total + parseInt(age.observation, 10), scaled: that.state.m3.scaled + parseInt(age.observation, 10) / 1000}
            })
          }
          if(age.dimensions.age.label <= 40) {
            that.setState({
              m4: {total: that.state.m4.total + parseInt(age.observation, 10), scaled: that.state.m4.scaled + parseInt(age.observation, 10) / 1000}
            })
          }
          if(age.dimensions.age.label <= 50) {
            that.setState({
              m5: {total: that.state.m5.total + parseInt(age.observation, 10), scaled: that.state.m5.scaled + parseInt(age.observation, 10) / 1000}
            })
          }
          if(age.dimensions.age.label <= 60) {
            that.setState({
              m6: {total: that.state.m6.total + parseInt(age.observation, 10), scaled: that.state.m6.scaled + parseInt(age.observation, 10) / 1000}
            })
          }
          if(age.dimensions.age.label <= 70) {
            that.setState({
              m7: {total: that.state.m7.total + parseInt(age.observation, 10), scaled: that.state.m7.scaled + parseInt(age.observation, 10) / 1000}
            })
          }
          if(age.dimensions.age.label <= 80) {
            that.setState({
              m8: {total: that.state.m8.total + parseInt(age.observation, 10), scaled: that.state.m8.scaled + parseInt(age.observation, 10) / 1000}
            })
          }
          if(age.dimensions.age.label <= 90) {
            that.setState({
              m9: {total: that.state.m9.total + parseInt(age.observation, 10), scaled: that.state.m9.scaled + parseInt(age.observation, 10) / 1000}
            })
          }
          if(age.dimensions.age.label > 90) {
            that.setState({
              m10: {total: that.state.m10.total + parseInt(age.observation, 10), scaled: that.state.m10.scaled + parseInt(age.observation, 10) / 1000}
            })
          }
        })
      })
  }

  render() {
    console.log(this.state)
    return (
      <figure>
        <figcaption>A graph that shows the number of fruit collected</figcaption>
        <svg version="1.1" className="chart" width="100%" height="200" aria-labelledby="title" role="img">
          <title id="title">A bart chart showing information</title>
          <g className="bar">
            <rect width={this.state.m10.scaled} height="19"></rect>
            <text x="45" y="9.5" dy=".35em">4 apples</text>
          </g>
          <g className="bar">
            <rect width={this.state.m9.scaled} height="19" y="20"></rect>
            <text x="85" y="28" dy=".35em">8 bananas</text>
          </g>
          <g className="bar">
            <rect width={this.state.m8.scaled} height="19" y="40"></rect>
            <text x="150" y="48" dy=".35em">15 kiwis</text>
          </g>
          <g className="bar">
            <rect width={this.state.m7.scaled} height="19" y="60"></rect>
            <text x="161" y="68" dy=".35em">16 oranges</text>
          </g>
          <g className="bar">
            <rect width={this.state.m6.scaled} height="19" y="80"></rect>
            <text x="235" y="88" dy=".35em">23 lemons</text>
          </g>
          <g className="bar">
            <rect width={this.state.m5.scaled} height="19" y="100"></rect>
            <text x="235" y="108" dy=".35em">23 lemons</text>
          </g>
          <g className="bar">
            <rect width={this.state.m4.scaled} height="19" y="120"></rect>
            <text x="235" y="128" dy=".35em">23 lemons</text>
          </g>
          <g className="bar">
            <rect width={this.state.m3.scaled} height="19" y="140"></rect>
            <text x="235" y="148" dy=".35em">23 lemons</text>
          </g>
          <g className="bar">
            <rect width={this.state.m2.scaled} height="19" y="160"></rect>
            <text x="235" y="168" dy=".35em">23 lemons</text>
          </g>
          <g className="bar">
            <rect width={this.state.m1.scaled} height="19" y="180"></rect>
            <text x="235" y="188" dy=".35em">23 lemons</text>
          </g>
        </svg>

        <svg version="1.1" className="chart-left" width="100%" height="200" aria-labelledby="title" role="img">
          <title id="title">A bart chart showing information</title>
          <g className="bar">
            <rect width={this.state.m10.scaled} height="19" ></rect>
            <text x="45" y="9.5" dy=".35em">4 apples</text>
          </g>
          <g className="bar">
            <rect width={this.state.m9.scaled} height="19" y="20"></rect>
            <text x="85" y="28" dy=".35em">8 bananas</text>
          </g>
          <g className="bar">
            <rect width={this.state.m8.scaled} height="19" y="40"></rect>
            <text x="150" y="48" dy=".35em">15 kiwis</text>
          </g>
          <g className="bar">
            <rect width={this.state.m7.scaled} height="19" y="60"></rect>
            <text x="161" y="68" dy=".35em">16 oranges</text>
          </g>
          <g className="bar">
            <rect width={this.state.m6.scaled} height="19" y="80"></rect>
            <text x="235" y="88" dy=".35em">23 lemons</text>
          </g>
          <g className="bar">
            <rect width={this.state.m5.scaled} height="19" y="100"></rect>
            <text x="235" y="108" dy=".35em">23 lemons</text>
          </g>
          <g className="bar">
            <rect width={this.state.m4.scaled} height="19" y="120"></rect>
            <text x="235" y="128" dy=".35em">23 lemons</text>
          </g>
          <g className="bar">
            <rect width={this.state.m3.scaled} height="19" y="140"></rect>
            <text x="235" y="148" dy=".35em">23 lemons</text>
          </g>
          <g className="bar">
            <rect width={this.state.m2.scaled} height="19" y="160"></rect>
            <text x="235" y="168" dy=".35em">23 lemons</text>
          </g>
          <g className="bar">
            <rect width={this.state.m1.scaled} height="19" y="180"></rect>
            <text x="235" y="188" dy=".35em">23 lemons</text>
          </g>
        </svg>
      </figure>
    )
  }
}

export default BarChart;
