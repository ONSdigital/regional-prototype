import React, { Component } from 'react';
import { getEarnings, getEarningsMale, getEarningsFemale } from '../../api/RequestHandler';
import EarningsChart from '../Charts/EarningsChart';

class EarningsData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullTime: [],
      fullTimeMale: [],
      fullTimeFemale: [],
      loaded: false
    }
  }

  async componentDidMount () {
    let that = this
    await getEarnings(this.props.localAuth)
      .then((response) => {
        response.observations.forEach(function(time) {
          if (time.observation === '') {
            return null
          } else {
            that.setState({
              fullTime: [...that.state.fullTime, {x: time.dimensions.Time.label, y: parseInt(time.observation, 10)}]
            })
          }
        })
      })

    await getEarningsMale(this.props.localAuth)
      .then((response) => {
        response.observations.forEach(function(time) {
          if(time.observation === '') {
            return null
          } else {
            that.setState({
              fullTimeMale: [...that.state.fullTimeMale, {x: time.dimensions.Time.label, y: parseInt(time.observation, 10)}]
            })
          }

        })
      })

    await getEarningsFemale(this.props.localAuth)
      .then((response) => {
        response.observations.forEach(function(time) {
          if(time.observation === '') {
            return null
          } else {
            that.setState({
              fullTimeFemale: [...that.state.fullTimeFemale, {x: time.dimensions.Time.label, y: parseInt(time.observation, 10)}]
            })
          }

        })
      })

    this.setState({
      loaded: true
    })
  }

  render() {
    return (
      <div>
        {this.state.loaded ? <EarningsChart dataFull={this.state.fullTime.reverse()} dataMale={this.state.fullTimeMale.reverse()} dataFemale={this.state.fullTimeFemale.reverse()}/> : null}

      </div>

    )
  }
}

export default EarningsData
