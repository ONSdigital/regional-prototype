import React, { Component } from 'react';
import GenderPayGapChart from '../Charts/GenderPayGapChart';
import {getHourlyEarnings} from '../../api/RequestHandler';

class GenderPayGapData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      femaleFT: [],
      maleFT: [],
      femalePT: [],
      malePT: [],
      femaleAll: [],
      maleAll: [],
      fullTime: [],
      partTime: [],
      all: [],
      loaded: false
    }
  }

  async componentDidMount() {
    let that = this

    await getHourlyEarnings(this.props.localAuth, "full-time", "male")
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.observation === "") {
            that.setState({
              maleFT: [...that.state.maleFT, {x: item.dimensions.Time.label , y: 0}]
            })
          } else {
            that.setState({
              maleFT: [...that.state.maleFT, {x: item.dimensions.Time.label , y: parseFloat(item.observation,2)}]
            })
          }
        })
      })

    await getHourlyEarnings(this.props.localAuth, "full-time", "female")
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.observation === "") {
            that.setState({
              femaleFT: [...that.state.femaleFT, {x: item.dimensions.Time.label , y: 0}]
            })
          } else {
            that.setState({
              femaleFT: [...that.state.femaleFT, {x: item.dimensions.Time.label , y: parseFloat(item.observation, 2)}]
            })
          }
        })
      })

    await getHourlyEarnings(this.props.localAuth, "part-time", "male")
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.observation === "") {
            console.log(item)
            that.setState({
              malePT: [...that.state.malePT, {x: item.dimensions.Time.label , y: 0}]
            })
          } else {
            that.setState({
              malePT: [...that.state.malePT, {x: item.dimensions.Time.label , y: parseFloat(item.observation,2)}]
            })
          }
        })
      })

    await getHourlyEarnings(this.props.localAuth, "part-time", "female")
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.observation === "") {
            that.setState({
              femalePT: [...that.state.femalePT, {x: item.dimensions.Time.label , y: 0}]
            })
          } else {
            that.setState({
              femalePT: [...that.state.femalePT, {x: item.dimensions.Time.label , y: parseFloat(item.observation, 2)}]
            })
          }
        })
      })

    await getHourlyEarnings(this.props.localAuth, "all", "male")
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.observation === "") {
            that.setState({
              maleAll: [...that.state.maleAll, {x: item.dimensions.Time.label , y: 0}]
            })
          } else {
            that.setState({
              maleAll: [...that.state.maleAll, {x: item.dimensions.Time.label , y: parseFloat(item.observation,2)}]
            })
          }
        })
      })

    await getHourlyEarnings(this.props.localAuth, "all", "female")
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.observation === "") {
            that.setState({
              femaleAll: [...that.state.femaleAll, {x: item.dimensions.Time.label , y: 0}]
            })
          } else {
            that.setState({
              femaleAll: [...that.state.femaleAll, {x: item.dimensions.Time.label , y: parseFloat(item.observation, 2)}]
            })
          }
        })
      })

    await this.getPercentage(this.state.femaleFT, this.state.maleFT, "fullTime")
    await this.getPercentage(this.state.femalePT, this.state.malePT, "partTime")
    await this.getPercentage(this.state.femaleAll, this.state.maleAll, "all")

    this.setState({
      loaded: true
    })

  }

  getPercentage(female, male, hours) {
    let that = this
    female.forEach(function(f) {
      male.forEach(function(m) {
        if(f.x === m.x) {
          if(f.y === 0 || m.y === 0) {
            return null
          } else {
            that.setState({
              [hours]: [...that.state[hours], {x: f.x, y: ((m.y - f.y) / m.y) * 100}]
            })
          }
        }
      })
    })
  }


  render() {
    return (
      <div>
        {this.state.loaded ? <GenderPayGapChart fullTime={this.state.fullTime} partTime={this.state.partTime}  all={this.state.all}/> : null}

      </div>

    )
  }
}

export default GenderPayGapData;
