import React, { Component } from 'react';
import { getEarnings, getEarningsMale, getEarningsFemale } from '../../api/RequestHandler';
import EarningsChart from '../Charts/EarningsChart';
import CMDLink from '../CMDLink';

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
              fullTime: [...that.state.fullTime, {x: Number(time.dimensions.Time.label), y: Number(time.observation)}]
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
              fullTimeMale: [...that.state.fullTimeMale, {x: Number(time.dimensions.Time.label), y: Number(time.observation)}]
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
              fullTimeFemale: [...that.state.fullTimeFemale, {x: Number(time.dimensions.Time.label), y: Number(time.observation)}]
            })
          }

        })
      })

    this.setState({
      loaded: true
    })
  }

  render() {
    let body = '{"name": "earnings", "options": [ "annual-pay-gross" ] }, { "name": "sex", "options": [ "all", "female", "male" ] }, {"name": "statistics", "options": [ "median" ] }, { "name": "time", "options": [ "2017" ] }, { "name": "workingpattern", "options": ["full-time"] }'
    return (
      <div className="col-5">
        {this.state.loaded && this.props.show ?
          <div>
            <h3>Full Time</h3>
            <EarningsChart dataFull={this.state.fullTime} dataMale={this.state.fullTimeMale} dataFemale={this.state.fullTimeFemale}/>
            <CMDLink
              localAuth={this.props.localAuth}
              dataset="ashe-table-7-earnings"
              body={body}
              icon="dark"
               />
          </div>
            : null}
      </div>

    )
  }
}

export default EarningsData
