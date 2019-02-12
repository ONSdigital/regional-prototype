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
        response.observations.forEach(function(time) {
          if (time.observation === '') {
            return null
          } else {
            that.setState({
              partTime: [...that.state.partTime, {x: Number(time.dimensions.Time.label), y: Number(time.observation)}]
            })
          }
        })
      })

    await getPartTimeEarningsMale(this.props.localAuth)
      .then((response) => {
        response.observations.forEach(function(time) {
          if(time.observation === '') {
            return null
          } else {
            that.setState({
              partTimeMale: [...that.state.partTimeMale, {x: Number(time.dimensions.Time.label), y: Number(time.observation)}]
            })
          }

        })
      })

    await getPartTimeEarningsFemale(this.props.localAuth)
      .then((response) => {
        response.observations.forEach(function(time) {
          if(time.observation === '') {
            return null
          } else {
            that.setState({
              partTimeFemale: [...that.state.partTimeFemale, {x: Number(time.dimensions.Time.label), y: Number(time.observation)}]
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
      <div className="col-5">
        {this.state.loaded && this.props.show ?
          <div>
            <h3>Part Time</h3>
            <EarningsChart dataFull={this.state.partTime} dataMale={this.state.partTimeMale} dataFemale={this.state.partTimeFemale}/>
          </div> : null}
      </div>

    )
  }
}

export default PartTimeEarningsData
