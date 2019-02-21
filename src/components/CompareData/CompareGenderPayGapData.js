import React, { Component } from 'react';
import CompareGenderPayGapChart from '../CompareCharts/CompareGenderPayGapChart';
import {getHourlyEarnings} from '../../api/RequestHandler';
import CMDLink from '../CMDLink';

class GenderPayGapData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      femaleFT: [],
      maleFT: [],
      femalePT: [],
      malePT: [],
      femaleAll: [],
      maleAll: [],
      fullTime: [],
      partTime: [],
      all: [],
      date: 0,
      loadedMaleFT: false,
      loadedFemaleFT: false,
      loadedMalePT: false,
      loadedFemalePT: false,
      loadedMaleAll: false,
      loadedFemaleAll: false
    }
  }

  async componentDidMount() {
    let that = this

    let localAuthority = {}
    await this.props.localAuth.forEach(function(localAuth) {
      localAuthority[localAuth.id] = {all: {male: [], female: []}, partTime: {male: [], female: []}, fullTime: {male:[], female: []}}
      getHourlyEarnings(localAuth.id, "full-time", "male")
        .then((response) => {
          response.observations.forEach(function(item) {
            if(item.observation === "") {
              localAuthority[localAuth.id]["fullTime"]["male"].push({x: Number(item.dimensions.Time.label), y: 0})
            } else {
              localAuthority[localAuth.id]["fullTime"]["male"].push({x: Number(item.dimensions.Time.label) , y: Number(item.observation)})
            }
            that.setState({
              loadedMaleFT: true
            })
          })
        })

      getHourlyEarnings(localAuth.id, "full-time", "female")
        .then((response) => {
          response.observations.forEach(function(item) {
            if(item.observation === "") {
              localAuthority[localAuth.id]['fullTime']["female"].push({x: Number(item.dimensions.Time.label), y: 0})
            } else {
              localAuthority[localAuth.id]['fullTime']["female"].push({x: Number(item.dimensions.Time.label) , y: Number(item.observation)})
            }
            that.setState({
              loadedFemaleFT: true
            })
          })
        })

      getHourlyEarnings(localAuth.id, "part-time", "male")
        .then((response) => {
          response.observations.forEach(function(item) {
            if(item.observation === "") {
              localAuthority[localAuth.id]['partTime']["male"].push({x: Number(item.dimensions.Time.label), y: 0})
            } else {
              localAuthority[localAuth.id]['partTime']["male"].push({x: Number(item.dimensions.Time.label) , y: Number(item.observation)})
            }
            that.setState({
              loadedMalePT: true
            })
          })
        })

      getHourlyEarnings(localAuth.id, "part-time", "female")
        .then((response) => {
          response.observations.forEach(function(item) {
            if(item.observation === "") {
              localAuthority[localAuth.id]['partTime']["female"].push({x: Number(item.dimensions.Time.label), y: 0})
            } else {
              localAuthority[localAuth.id]['partTime']["female"].push({x: Number(item.dimensions.Time.label) , y: Number(item.observation)})
            }
            that.setState({
              loadedFemalePT: true
            })
          })
        })

      getHourlyEarnings(localAuth.id, "all", "male")
        .then((response) => {
          response.observations.forEach(function(item) {
            if(item.observation === "") {
              localAuthority[localAuth.id]['all']["male"].push({x: Number(item.dimensions.Time.label), y: 0})
            } else {
              localAuthority[localAuth.id]['all']["male"].push({x: Number(item.dimensions.Time.label) , y: Number(item.observation)})
            }
            that.setState({
              loadedMaleAll: true
            })
          })
        })

      getHourlyEarnings(localAuth.id, "all", "female")
        .then((response) => {
          response.observations.forEach(function(item) {
            if(item.observation === "") {
              localAuthority[localAuth.id]['all']["female"].push({x: Number(item.dimensions.Time.label), y: 0})
            } else {
              localAuthority[localAuth.id]['all']["female"].push({x: Number(item.dimensions.Time.label) , y: Number(item.observation)})
            }
            that.setState({
              loadedFemaleAll: true
            })
          })
        })
    })

    Object.keys(localAuthority).map((item) =>
      this.getPercentage(localAuthority[item]['fullTime']['female'], localAuthority[item]['fullTime']['male'], "fullTime", [item])
    )
    Object.keys(localAuthority).map((item) =>
      this.getPercentage(localAuthority[item]['partTime']['female'], localAuthority[item]['partTime']['male'], "partTime", [item])
    )
    Object.keys(localAuthority).map((item) =>
      console.log(this.getPercentage(localAuthority[item]['all']['female'], localAuthority[item]['all']['male'], "all", [item]))
    )

    this.setDate([...this.state.fullTime, ...this.state.partTime, ...this.state.all])
  }

  getPercentage(female, male, hours, localAuth) {
    
  }

  setDate(array) {
    let that = this
    let data = []
    array.forEach(function(date) {
      data.push(date.x)
    })
    if (data.length === array.length) {
      that.setState({
          date: that.getHighest(data)
      })
    }
  }

  getHighest(array) {
    return Math.max.apply(Math, array);
  }



  render() {
    let fullTime = this.state.fullTime.filter((date) =>
        date.x === this.state.date ? date : null
      )
    let partTime = this.state.partTime.filter((date) =>
        date.x === this.state.date ? date : null
      )
    let all = this.state.all.filter((date) =>
        date.x === this.state.date ? date : null
      )
    let body = '{"name": "earnings", "options": [ "hourly-pay-excluding-overtime" ] }, { "name": "sex", "options": [ "all", "female", "male" ] }, {"name": "statistics", "options": [ "median" ] }, { "name": "time", "options": [ "2017" ] }, { "name": "workingpattern", "options": ["part-time", "full-time", "all"] }'
    return (
      <div>
        {this.state.loaded && this.props.show ?
          <div className="row justify-content-md-center">
            <div className="col-10">
              <h2>Gender Pay Gap</h2>
            </div>
            <div className="col-3">
              <h3>Key Figures ({this.state.date}):</h3>
              <h4>Full Time: {fullTime.length > 0 ? `${fullTime[0].y.toFixed(2)}%` : "No data"}</h4>
              <h4>Part Time: {partTime.length > 0 ? `${partTime[0].y.toFixed(2)}%` : "No data"}</h4>
              <h4>All Working Patterns: {all.length > 0 ? `${all[0].y.toFixed(2)}%` : "No data"}</h4>
            </div>
            <div className="col-5">
              <CompareGenderPayGapChart fullTime={this.state.fullTime} partTime={this.state.partTime}  all={this.state.all}/>
            </div>
            <div className="col-2">
            </div>
          </div>
          : null}
      </div>
    )
  }
}

export default GenderPayGapData;
