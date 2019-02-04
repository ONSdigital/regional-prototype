import React, { Component } from 'react';
import { getPartTimeEarnings, getPartTimeEarningsMale, getPartTimeEarningsFemale } from '../../api/RequestHandler';
import EarningsChart from '../Charts/EarningsChart';

class PartTimeEarningsData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      partTime: [],
      partTimeMale: [],
      partTimeFemale: [],
      loaded: false
    }
  }

  async componentDidMount () {
    let that = this
    await getPartTimeEarnings(this.props.localAuth)
      .then((response) => {
        console.log(response)
        response.observations.forEach(function(time) {
          if (time.observation === '') {
            return null
          } else {
            that.setState({
              partTime: [...that.state.partTime, {x: time.dimensions.Time.label, y: parseInt(time.observation, 10)}]
            })
          }
        })
      })

    await getPartTimeEarningsMale(this.props.localAuth)
      .then((response) => {
        console.log(response)
        response.observations.forEach(function(time) {
          if(time.observation === '') {
            return null
          } else {
            that.setState({
              partTimeMale: [...that.state.partTimeMale, {x: time.dimensions.Time.label, y: parseInt(time.observation, 10)}]
            })
          }

        })
      })

    await getPartTimeEarningsFemale(this.props.localAuth)
      .then((response) => {
        console.log(response)
        response.observations.forEach(function(time) {
          if(time.observation === '') {
            return null
          } else {
            that.setState({
              partTimeFemale: [...that.state.partTimeFemale, {x: time.dimensions.Time.label, y: parseInt(time.observation, 10)}]
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
        {this.state.loaded ? <EarningsChart dataFull={this.state.partTime.reverse()} dataMale={this.state.partTimeMale.reverse()} dataFemale={this.state.partTimeFemale.reverse()}/> : null}

      </div>

    )
  }
}

export default PartTimeEarningsData
