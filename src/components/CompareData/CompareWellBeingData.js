import React, { Component } from 'react';
import { getLocalWellBeing, getUKWellBeing } from '../../api/RequestHandler';
import CompareWellBeingChart from '../CompareCharts/CompareWellBeingChart';
import CMDLink from '../CMDLink';
import {saveSvgAsPng} from 'save-svg-as-png';

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
      getLocalWellBeing(localAuth.id, '*', 'anxiety')
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

      getLocalWellBeing(localAuth.id, '*', 'happiness')
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

      getLocalWellBeing(localAuth.id, '*', 'worthwhile')
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

      getLocalWellBeing(localAuth.id, '*', 'life-satisfaction')
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

  handleDownload(e) {
    saveSvgAsPng(document.getElementById(e.target.value), `${e.target.value}.png`, {scale: 2});
  }

  render() {
    let body = '{ "name": "allmeasuresofwellbeing", "options": [ "anxiety", "happiness", "worthwhile", "life-satisfaction" ] }, { "name": "estimate", "options": [ "average-mean", "fair", "good", "poor", "very-good" ] }, { "name": "time", "options": ["2017-18"] }'
    return (
      <div>
        {this.state.loadedAnxiety && this.state.loadedHappiness && this.state.loadedWorthwhile && this.state.loadedLifeSatisfaction ?
          <div className="row justify-content-md-center">
            <div id="anxiety" className="col-lg-6 col-md-12 compare-wellbeing">
              <h4 className="well-being-title">Anxiety</h4>
              <CompareWellBeingChart localAuth={this.props.localAuth} data={this.state.data} title="anxiety" />
              <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value='compareAnxiety'>Save this chart</button>
            </div>
            <div id="happiness" className="col-lg-6 col-md-12 compare-wellbeing">
              <h4 className="well-being-title">Happiness</h4>
              <CompareWellBeingChart localAuth={this.props.localAuth} data={this.state.data} title="happiness"/>
              <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value='compareHappiness'>Save this chart</button>
            </div>
            <div id="worthwhile" className="col-lg-6 col-md-12 compare-wellbeing">
              <h4 className="well-being-title">Worthwhile</h4>
              <CompareWellBeingChart localAuth={this.props.localAuth} data={this.state.data} title="worthwhile" />
              <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value='compareWorthwhile'>Save this chart</button>
            </div>
            <div id="lifeSatisfaction" className="col-lg-6 col-md-12 compare-wellbeing">
              <h4 className="well-being-title">Life Satisfaction</h4>
              <CompareWellBeingChart localAuth={this.props.localAuth} data={this.state.data} title="lifeSatisfaction" />
              <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value='compareLifeSatisfaction'>Save this chart</button>
            </div>
          </div>
           : null}
          <div className="cmd-wellbeing">
            <CMDLink
              localAuth={this.props.localAuth}
              dataset="wellbeing-local-authority"
              body={body}
              icon="dark"
               />
          </div>
          <div className="col-10">
                        <p>The groupings used are defined as:
                          <ul>
                            <li className= "margin-top--0 margin-bottom--0">Very good - a rating of 0-1 for anxiety and 9-10 for happiness, life satisfaction and worthwhile. </li>
                            <li className= "margin-top--0 margin-bottom--0">Good - a rating of 2-3 for anxiety and 7-8 for happiness, life satisfaction and worthwhile. </li>
                            <li className= "margin-top--0 margin-bottom--0">Fair - a rating of 4-5 for anxiety and 5-6 for happiness, life satisfaction and worthwhile. </li>
                            <li className= "margin-top--0 margin-bottom--0">Poor - a rating of 6-10 for anxiety and 0-4 for happiness, life satisfaction and worthwhile.</li> 
                          </ul>
                        </p>
                    </div>
      </div>
    )
  }
}

export default CompareWellBeingData
