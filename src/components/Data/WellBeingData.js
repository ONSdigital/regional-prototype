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
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            that.setState({
              ukAnxiety: [...that.state.ukAnxiety, {x: item.dimensions.estimate.label, y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
            })
          }
        })
      })

    await getUKWellBeing('happiness')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            that.setState({
              ukHappiness: [...that.state.ukHappiness, {x: item.dimensions.estimate.label, y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
            })
          }
        })
      })

    await getUKWellBeing('worthwhile')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            that.setState({
              ukWorthwhile: [...that.state.ukWorthwhile, {x: item.dimensions.estimate.label, y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
            })
          }
        })
      })

    await getUKWellBeing('life-satisfaction')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            that.setState({
              ukLifeSatisfaction: [...that.state.ukLifeSatisfaction, {x: item.dimensions.estimate.label, y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
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
                localAnxiety: [...that.state.localAnxiety, {x: item.dimensions.estimate.label , y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
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
                localHappiness: [...that.state.localHappiness, {x: item.dimensions.estimate.label , y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
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
                localWorthwhile: [...that.state.localWorthwhile, {x: item.dimensions.estimate.label , y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
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
                localLifeSatisfaction: [...that.state.localLifeSatisfaction, {x: item.dimensions.estimate.label , y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
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
        {this.state.loaded && this.props.show ?
          <div className="row justify-content-md-center">
            <div className="col-10">
              <h2>Personal Well-being</h2>
            </div>
            <div className="col-5">
              <h3>Anxiety</h3>
              <WellBeingChart local={this.state.localAnxiety} uk={this.state.ukAnxiety} color={["rgb(15, 130, 67)", "#3B7A9E"]} title="Anxiety" />
            </div>
            <div className="col-5">
              <h3>Happiness</h3>
              <WellBeingChart local={this.state.localHappiness} uk={this.state.ukHappiness} color={["rgb(255, 178, 76)", "#3B7A9E"]} title="Happiness"/>
            </div>
            <div className="col-5">
              <h3>Worthwhile</h3>
              <WellBeingChart local={this.state.localWorthwhile} uk={this.state.ukWorthwhile} color={["rgb(211, 47, 47)", "#3B7A9E"]} title="Worthwhile" />
            </div>
            <div className="col-5">
              <h3>Life Satisfaction</h3>
              <WellBeingChart local={this.state.localLifeSatisfaction} uk={this.state.ukLifeSatisfaction} color={["purple", "#3B7A9E"]} title="Life Satisfaction" />
            </div>
          </div>
           : null}
      </div>
    )
  }
}

export default WellBeingData
