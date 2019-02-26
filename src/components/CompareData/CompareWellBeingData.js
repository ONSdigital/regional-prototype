import React, { Component } from 'react';
import { getLocalWellBeing, getUKWellBeing } from '../../api/RequestHandler';
import CompareWellBeingChart from '../CompareCharts/CompareWellBeingChart';
import CMDLink from '../CMDLink';

class CompareWellBeingData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedAnxiety: false,
      loadedHappiness: false,
      loadedWorthwhile: false,
      loadedLifeSatisfaction: false,
      data: {},
      date: '2017-18'
    }
  }

  async componentDidMount() {

    let that = this
    let localAuthority = {}
    this.props.localAuth.forEach(function(localAuth) {
      localAuthority[localAuth.id] = {anxiety: [], happiness: [], worthwhile: [], lifeSatisfaction: []}
      getLocalWellBeing(localAuth.id, that.state.date, 'anxiety')
        .then((response) => {
          response.observations.forEach(function(item) {
            if(item.dimensions.estimate.id !== "average-mean") {
              if(item.metadata.data_markings === "x") {
                localAuthority[localAuth.id]['anxiety'].push({x: item.dimensions.estimate.label , y: 0, z: that.assignValue(item.dimensions.estimate.label)})
              } else {
                localAuthority[localAuth.id]['anxiety'].push({x: item.dimensions.estimate.label , y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)})
              }
              that.setState({
                loadedAnxiety: true
              })
            }
          })
        })

      getLocalWellBeing(localAuth.id, that.state.date, 'happiness')
        .then((response) => {
          response.observations.forEach(function(item) {
            if(item.dimensions.estimate.id !== "average-mean") {
              if(item.metadata.Data_Marking === "x") {
                localAuthority[localAuth.id]['happiness'].push({x: item.dimensions.estimate.label , y: 0, z: that.assignValue(item.dimensions.estimate.label)})
              } else {
                localAuthority[localAuth.id]['happiness'].push({x: item.dimensions.estimate.label , y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)})
              }
              that.setState({
                loadedHappiness: true
              })
            }
          })
        })

      getLocalWellBeing(localAuth.id, that.state.date, 'worthwhile')
        .then((response) => {
          response.observations.forEach(function(item) {
            if(item.dimensions.estimate.id !== "average-mean") {
              if(item.metadata.Data_Marking === "x") {
                localAuthority[localAuth.id]['worthwhile'].push({x: item.dimensions.estimate.label , y: 0, z: that.assignValue(item.dimensions.estimate.label)})
              } else {
                localAuthority[localAuth.id]['worthwhile'].push({x: item.dimensions.estimate.label , y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)})
              }
              that.setState({
                loadedWorthwhile: true
              })
            }
          })
        })

      getLocalWellBeing(localAuth.id, that.state.date, 'life-satisfaction')
        .then((response) => {
          response.observations.forEach(function(item) {
            if(item.dimensions.estimate.id !== "average-mean") {
              if(item.metadata.Data_Marking === "x") {
                localAuthority[localAuth.id]['lifeSatisfaction'].push({x: item.dimensions.estimate.label , y: 0, z: that.assignValue(item.dimensions.estimate.label)})
              } else {
                localAuthority[localAuth.id]['lifeSatisfaction'].push({x: item.dimensions.estimate.label , y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)})
              }
              that.setState({
                loadedLifeSatisfaction: true
              })
            }
          })
        })
    })
    this.setState({
      data: localAuthority
    })
  }

  assignValue(value) {
    if (value === "Poor") {
      return 1
    } else if (value === "Fair") {
      return 2
    } else if (value === "Good") {
      return 3
    } else if (value ==="Very good") {
      return 4
    }
  }

  render() {
    let bodyAnxiety = '{ "name": "allmeasuresofwellbeing", "options": [ "anxiety" ] }, { "name": "estimate", "options": [ "average-mean", "fair", "good", "poor", "very-good" ] }, { "name": "time", "options": ["2017-18"] }'
    let bodyHappiness = '{ "name": "allmeasuresofwellbeing", "options": [ "happiness" ] }, { "name": "estimate", "options": [ "average-mean", "fair", "good", "poor", "very-good" ] }, { "name": "time", "options": ["2017-18"] }'
    let bodyWorthwhile = '{ "name": "allmeasuresofwellbeing", "options": [ "worthwhile" ] }, { "name": "estimate", "options": [ "average-mean", "fair", "good", "poor", "very-good" ] }, { "name": "time", "options": ["2017-18"] }'
    let bodyLifeSatisfaction = '{ "name": "allmeasuresofwellbeing", "options": [ "life-satisfaction" ] }, { "name": "estimate", "options": [ "average-mean", "fair", "good", "poor", "very-good" ] }, { "name": "time", "options": ["2017-18"] }'
    return (
      <div>
        {this.state.loadedAnxiety && this.state.loadedHappiness && this.state.loadedWorthwhile && this.state.loadedLifeSatisfaction ?
          <div className="row justify-content-md-center">
            <div className="col-6">
              <h4 className="well-being-title">Anxiety</h4>
              <CompareWellBeingChart localAuth={this.props.localAuth} data={this.state.data} title="anxiety" />
            </div>
            <div className="col-6">
              <h4 className="well-being-title">Happiness</h4>
              <CompareWellBeingChart localAuth={this.props.localAuth} data={this.state.data} title="happiness"/>
            </div>
            <div className="col-6">
              <h4 className="well-being-title">Worthwhile</h4>
              <CompareWellBeingChart localAuth={this.props.localAuth} data={this.state.data} title="worthwhile" />
            </div>
            <div className="col-6">
              <h4 className="well-being-title">Life Satisfaction</h4>
              <CompareWellBeingChart localAuth={this.props.localAuth} data={this.state.data} title="lifeSatisfaction" />
            </div>
          </div>
           : null}

      </div>
    )
  }
}

export default CompareWellBeingData
