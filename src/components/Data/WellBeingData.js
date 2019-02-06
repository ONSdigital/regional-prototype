import React, { Component } from 'react';
import { getLocalWellBeing, getUKWellBeing } from '../../api/RequestHandler';
import WellBeingChart from '../Charts/WellBeingChart';

class WellBeingData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      ukAnxiety: [],
      ukHappiness: [],
      ukWorthwhile: [],
      ukLifeSatisfaction: [],
      localAnxiety: [],
      localHappiness: [],
      localWorthwhile: [],
      localLifeSatisfaction: []
    }
  }

  async componentDidMount() {

    let that = this

    await getUKWellBeing('anxiety')
      .then((response) => {
        console.log(response)
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            that.setState({
              ukAnxiety: [...that.state.ukAnxiety, {x: item.dimensions.estimate.label, y: parseFloat(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
            })
          }
        })
      })

    await getUKWellBeing('happiness')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            that.setState({
              ukHappiness: [...that.state.ukHappiness, {x: item.dimensions.estimate.label, y: parseInt(item.observation,10), z: that.assignValue(item.dimensions.estimate.label)}]
            })
          }
        })
      })

    await getUKWellBeing('worthwhile')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            that.setState({
              ukWorthwhile: [...that.state.ukWorthwhile, {x: item.dimensions.estimate.label, y: parseInt(item.observation,10), z: that.assignValue(item.dimensions.estimate.label)}]
            })
          }
        })
      })

    await getUKWellBeing('life-satisfaction')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            that.setState({
              ukLifeSatisfaction: [...that.state.ukLifeSatisfaction, {x: item.dimensions.estimate.label, y: parseInt(item.observation,10), z: that.assignValue(item.dimensions.estimate.label)}]
            })
          }
        })
      })

    await getLocalWellBeing(this.props.localAuth, 'anxiety')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            if(item.metadata.data_markings === "x") {
              that.setState({
                localAnxiety: [...that.state.localAnxiety, {x: item.dimensions.estimate.label , y: 0, z: that.assignValue(item.dimensions.estimate.label)}]
              })
            } else {
              that.setState({
                localAnxiety: [...that.state.localAnxiety, {x: item.dimensions.estimate.label , y: parseInt(item.observation,10), z: that.assignValue(item.dimensions.estimate.label)}]
              })
            }

          }
        })
      })

    await getLocalWellBeing(this.props.localAuth, 'happiness')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            if(item.metadata.Data_Marking === "x") {
              that.setState({
                localHappiness: [...that.state.localHappiness, {x: item.dimensions.estimate.label , y: 0, z: that.assignValue(item.dimensions.estimate.label)}]
              })
            } else {
              that.setState({
                localHappiness: [...that.state.localHappiness, {x: item.dimensions.estimate.label , y: parseInt(item.observation,10), z: that.assignValue(item.dimensions.estimate.label)}]
              })
            }
          }
        })
      })

    await getLocalWellBeing(this.props.localAuth, 'worthwhile')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            if(item.metadata.Data_Marking === "x") {
              that.setState({
                localWorthwhile: [...that.state.localWorthwhile, {x: item.dimensions.estimate.label , y: 0, z: that.assignValue(item.dimensions.estimate.label)}]
              })
            } else {
              that.setState({
                localWorthwhile: [...that.state.localWorthwhile, {x: item.dimensions.estimate.label , y: parseInt(item.observation,10), z: that.assignValue(item.dimensions.estimate.label)}]
              })
            }
          }
        })
      })

    await getLocalWellBeing(this.props.localAuth, 'life-satisfaction')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            if(item.metadata.Data_Marking === "x") {
              that.setState({
                localLifeSatisfaction: [...that.state.localLifeSatisfaction, {x: item.dimensions.estimate.label , y: 0, z: that.assignValue(item.dimensions.estimate.label)}]
              })
            } else {
              that.setState({
                localLifeSatisfaction: [...that.state.localLifeSatisfaction, {x: item.dimensions.estimate.label , y: parseInt(item.observation,10), z: that.assignValue(item.dimensions.estimate.label)}]
              })
            }
          }
        })
      })

    this.setState({
      loaded: true
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
    return (
      <div>
        <div className="col col--md-half col--lg-half">
          <h3>Anxiety</h3>
          <WellBeingChart local={this.state.localAnxiety} uk={this.state.ukAnxiety} color={["green", "#3B7A9E"]} />
        </div>
        <div className="col col--md-half col--lg-half">
          <h3>Happiness</h3>
          <WellBeingChart local={this.state.localHappiness} uk={this.state.ukHappiness} color={["orange", "#3B7A9E"]} />
        </div>
        <div className="col col--md-half col--lg-half">
          <h3>Worthwhile</h3>
          <WellBeingChart local={this.state.localWorthwhile} uk={this.state.ukWorthwhile} color={["red", "#3B7A9E"]} />
        </div>
        <div className="col col--md-half col--lg-half">
          <h3>Life Satisfaction</h3>
          <WellBeingChart local={this.state.localLifeSatisfaction} uk={this.state.ukLifeSatisfaction} color={["purple", "#3B7A9E"]} />
        </div>
      </div>
    )
  }
}

export default WellBeingData
