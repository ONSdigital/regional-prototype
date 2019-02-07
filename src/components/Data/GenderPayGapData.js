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
      date: 0,
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
              maleFT: [...that.state.maleFT, {x: Number(item.dimensions.Time.label), y: 0}]
            })
          } else {
            that.setState({
              maleFT: [...that.state.maleFT, {x: Number(item.dimensions.Time.label) , y: Number(item.observation)}]
            })
          }
        })
      })

    await getHourlyEarnings(this.props.localAuth, "full-time", "female")
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.observation === "") {
            that.setState({
              femaleFT: [...that.state.femaleFT, {x: Number(item.dimensions.Time.label) , y: 0}]
            })
          } else {
            that.setState({
              femaleFT: [...that.state.femaleFT, {x: Number(item.dimensions.Time.label) , y: Number(item.observation)}]
            })
          }
        })
      })

    await getHourlyEarnings(this.props.localAuth, "part-time", "male")
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.observation === "") {
            that.setState({
              malePT: [...that.state.malePT, {x:Number(item.dimensions.Time.label), y: 0}]
            })
          } else {
            that.setState({
              malePT: [...that.state.malePT, {x: Number(item.dimensions.Time.label) , y: Number(item.observation)}]
            })
          }
        })
      })

    await getHourlyEarnings(this.props.localAuth, "part-time", "female")
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.observation === "") {
            that.setState({
              femalePT: [...that.state.femalePT, {x: Number(item.dimensions.Time.label) , y: 0}]
            })
          } else {
            that.setState({
              femalePT: [...that.state.femalePT, {x: Number(item.dimensions.Time.label) , y: Number(item.observation)}]
            })
          }
        })
      })

    await getHourlyEarnings(this.props.localAuth, "all", "male")
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.observation === "") {
            that.setState({
              maleAll: [...that.state.maleAll, {x: Number(item.dimensions.Time.label) , y: 0}]
            })
          } else {
            that.setState({
              maleAll: [...that.state.maleAll, {x: Number(item.dimensions.Time.label) , y: Number(item.observation)}]
            })
          }
        })
      })

    await getHourlyEarnings(this.props.localAuth, "all", "female")
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.observation === "") {
            that.setState({
              femaleAll: [...that.state.femaleAll, {x: Number(item.dimensions.Time.label) , y: 0}]
            })
          } else {
            that.setState({
              femaleAll: [...that.state.femaleAll, {x: Number(item.dimensions.Time.label) , y: Number(item.observation)}]
            })
          }
        })
      })

    await this.getPercentage(this.state.femaleFT, this.state.maleFT, "fullTime")
    await this.getPercentage(this.state.femalePT, this.state.malePT, "partTime")
    await this.getPercentage(this.state.femaleAll, this.state.maleAll, "all")

    await this.setDate([...this.state.fullTime, ...this.state.partTime, ...this.state.all])

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
    return (
      <div>
        {this.state.loaded ?
          <div>
            <div className="col col--md-half col--lg-half">
              <h3>Key Figures ({this.state.date}):</h3>
              <h4>Full Time: {this.state.fullTime.map((date) =>
                  date.x === this.state.date ? `${date.y.toFixed(2)}%` : null
                )}</h4>
              <h4>Part Time: {this.state.partTime.map((date) =>
                  date.x === this.state.date ? `${date.y.toFixed(2)}%` : null
                )}</h4>
              <h4>All Working Patterns: {this.state.all.map((date) =>
                  date.x === this.state.date ? `${date.y.toFixed(2)}%` : null
                )}</h4>
            </div>
            <div className="col col--md-half col--lg-half">
              <GenderPayGapChart fullTime={this.state.fullTime} partTime={this.state.partTime}  all={this.state.all}/>
            </div>
          </div>
          : null}

      </div>

    )
  }
}

export default GenderPayGapData;
