import React, { Component } from 'react';
import { getPop, getMalePop, getFemalePop } from '../../api/RequestHandler';
import PopulationChart from '../Charts/PopulationChart';

class PopulationData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fData: [],
      mData: [],
      total: 0,
      loaded: false,
    }
  }

  async componentDidMount() {


    let that = this;

    await getPop(that.props.localAuth)
      .then((response) => {
        response.observations.forEach(function(age) {
          if(age.dimensions.age.id === 'total') {
            that.setState({
              total:  parseInt(age.observation, 10)
            })
          }
        })
      })

    await getMalePop(that.props.localAuth)
      .then((response) => {
        response.observations.forEach(function(age) {
          if(age.dimensions.age.label !== 'Total') {
            let number = parseInt(age.observation, 10) / that.state.total * 100
            if(age.dimensions.age.label === "90+") {
              that.setState({
                mData: [...that.state.mData, {x: age.dimensions.age.label.replace("90+", "90"), y: number, z: parseInt(age.observation, 10)}]
              })
            } else {
              that.setState({
                mData: [...that.state.mData, {x: age.dimensions.age.label, y: number, z: parseInt(age.observation, 10)}]
              })
            }
          }
        })
      })

    await getFemalePop(that.props.localAuth)
      .then((response) => {
        response.observations.forEach(function(age) {
          if(age.dimensions.age.label !== 'Total') {
            let number = parseInt(age.observation, 10) / that.state.total * 100
            if (age.dimensions.age.label === "90+") {
              that.setState({
                fData: [...that.state.fData, {x: age.dimensions.age.label.replace("90+", "90"), y: number, z: parseInt(age.observation, 10)}]
              })
            } else {
              that.setState({
                fData: [...that.state.fData, {x: age.dimensions.age.label, y: number, z: parseInt(age.observation, 10)}]
              })
            }

          }
        })
      })

    this.setState({
      loaded: true
    })
  }

  compareNumbers(a, b) {
    return a.x - b.x;
  }


  render() {
    return (
      <div id="population">
        <h3>Population: {this.state.total}</h3>
        <p className="label male">Male</p>
        <p className="label female">Female</p>
        {this.state.loaded ? <PopulationChart totalPop={this.state.total} fData={this.state.fData.sort(this.compareNumbers)} mData={this.state.mData.sort(this.compareNumbers)} /> : <p>Loading Population Pyramid...</p> }
      </div>


    )
  }
}

export default PopulationData
