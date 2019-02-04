import React, { Component } from 'react';
import { getPop, getMalePop, getFemalePop } from '../../api/RequestHandler';
import PopulationChart from '../Charts/PopulationChart';

class PopulationData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      m: {
        total: 0,
        m1: 0,
        m2: 0,
        m3: 0,
        m4: 0,
        m5: 0,
        m6: 0,
        m7: 0,
        m8: 0
      },
      f: {
        total: 0,
        f1: 0,
        f2: 0,
        f3: 0,
        f4: 0,
        f5: 0,
        f6: 0,
        f7: 0,
        f8: 0
      },
      fData: [],
      total: 0,
      loaded: false,
    }
  }

  sortPop(age, gender, pop) {
    if(age <= 10) {
      let range = "1";
      this.setState({
        [gender]: {
          ...this.state[gender],
          [gender + range]: this.state[gender][gender + range] + pop
        }
      })
    }
    if(age > 10 && age <= 20) {
      let range = "2";
      this.setState({
        [gender]: {
          ...this.state[gender],
          [gender + range]: this.state[gender][gender + range] + pop
        }
      })
    }
    if(age > 20 && age <= 30) {
      let range = "3";
      this.setState({
        [gender]: {
          ...this.state[gender],
          [gender + range]: this.state[gender][gender + range] + pop
        }
      })
    }
    if(age > 30 && age <= 40) {
      let range = "4";
      this.setState({
        [gender]: {
          ...this.state[gender],
          [gender + range]: this.state[gender][gender + range] + pop
        }
      })
    }
    if(age > 40 && age <= 50) {
      let range = "5";
      this.setState({
        [gender]: {
          ...this.state[gender],
          [gender + range]: this.state[gender][gender + range] + pop
        }
      })
    }
    if(age > 50 && age <= 60) {
      let range = "6";
      this.setState({
        [gender]: {
          ...this.state[gender],
          [gender + range]: this.state[gender][gender + range] + pop
        }
      })
    }
    if(age > 60 && age <= 70) {
      let range = "7";
      this.setState({
        [gender]: {
          ...this.state[gender],
          [gender + range]: this.state[gender][gender + range] + pop
        }
      })
    }
    if(age > 70 || age === "90+") {
      let range = "8";
      this.setState({
        [gender]: {
          ...this.state[gender],
          [gender + range]: this.state[gender][gender + range] + pop
        }
      })
    }
  }

  async componentDidMount() {


    let that = this;

    await getMalePop(that.props.localAuth)
      .then((response) => {
        response.observations.forEach(function(age) {
          if(age.dimensions.age.id === 'total') {
            that.setState({
              m: {
                ...that.state.m,
                total: parseInt(age.observation, 10)
              }
            })
          }
          that.sortPop(age.dimensions.age.id, "m", parseInt(age.observation, 10))
        })
      })

    await getFemalePop(that.props.localAuth)
      .then((response) => {
        response.observations.forEach(function(age) {
          that.setState({
            fData: [...that.state.fData, {x: age.dimensions.age.label, y: parseInt(age.observation, 10)}]
          })
        })

        response.observations.forEach(function(age) {
          if(age.dimensions.age.id === 'total') {
            that.setState({
              f: {
                ...that.state.f,
                total: parseInt(age.observation, 10)
              }
            })
          }
          that.sortPop(age.dimensions.age.id, "f", parseInt(age.observation, 10))
        })
      })

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

    this.setState({
      loaded: true
    })
  }


  render() {
    return (
      <div id="population">
        <h3>Population: {this.state.total}</h3>
        <p className="label male">Male</p>
        <p className="label female">Female</p>
        {this.state.loaded ? <PopulationChart totalPop={this.state.total} malePop={this.state.m} femalePop={this.state.f} fData={this.state.fData} /> : <p>Loading Population Pyramid...</p> }
      </div>


    )
  }
}

export default PopulationData
