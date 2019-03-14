import React, { Component } from 'react';
import { getPop, getMalePop, getFemalePop } from '../../api/RequestHandler';
import PopulationPyramid from '../Charts/PopulationPyramid';
import PopulationPie from '../Charts/PopulationPie';
import PopulationGraph from '../Charts/PopulationGraph';
import CMDLink from '../CMDLink';

class PopulationData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeSeries: [],
      fData: [],
      mData: [],
      total: 0,
      mTotal: {},
      fTotal: {},
      loaded: false,
      year: 0
    }
  }

  async componentDidMount() {

    let that = this;

    await getPop(that.props.localAuth)
      .then((response) => {
        response.observations.forEach(function(year) {
          that.setState({
            timeSeries: [
              ...that.state.timeSeries,
              {x: year.dimensions.time.label, y: Number(year.observation)}
            ]
          })
        })
        let object = response.observations.pop()
        that.setState({
          total: parseInt(object.observation),
          year: object.dimensions.time.label
        })

      })

    await getMalePop(that.props.localAuth)
      .then((response) => {
        response.observations.forEach(function(age) {
          if(age.dimensions.age.label !== 'Total') {
            let number = parseInt(age.observation, 10) / that.state.total * 100
            if(age.dimensions.age.label === "90+") {
              that.setState({
                mData: [...that.state.mData, {x: age.dimensions.age.label.replace("90+", "90"), y: number, y0: -0.025, z: parseInt(age.observation, 10)}]
              })
            } else {
              that.setState({
                mData: [...that.state.mData, {x: age.dimensions.age.label, y: number, y0: -0.025, z: parseInt(age.observation, 10)}]
              })
            }
          } else {
            let number = parseInt(age.observation, 10) / that.state.total * 100
            that.setState({
              mTotal: {x: 'Male', y: number}
            })
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
                fData: [...that.state.fData, {x: age.dimensions.age.label.replace("90+", "90"), y: number, y0: 0.025, z: parseInt(age.observation, 10)}]
              })
            } else {
              that.setState({
                fData: [...that.state.fData, {x: age.dimensions.age.label, y: number, y0: 0.025, z: parseInt(age.observation, 10)}]
              })
            }
          } else {
            let number = parseInt(age.observation, 10) / that.state.total * 100
            that.setState({
              fTotal: {x: 'Female', y: number}
            })
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

  handleDate(e) {
    this.setState({
      date: Number(e.target.value)
    })
  }

  render() {
    let body = '{ "name": "sex", "options": [ "0", "1", "2" ] }, { "name": "time", "options": [ "2016" ] }, { "name": "age", "options": [] }'
    return (
      <div>
        {this.props.show && this.state.loaded ?
          <div className="row justify-content-md-center">
            <div className="col-5" id="population">
              <h3>Population of {this.props.localAuthLabel}: {this.state.total.toLocaleString('en')} ({this.state.year})</h3>
              <p className="label male">Male<span className="male-legend"></span></p>
              <p className="label female"><span className="female-legend"></span>Female</p>
              <PopulationPyramid totalPop={this.state.total} fData={this.state.fData.sort(this.compareNumbers)} mData={this.state.mData.sort(this.compareNumbers)} />
            </div>
            <div className="col-5 pop-graph">
              <h3>Sex</h3>
              <PopulationPie data={[this.state.fTotal, this.state.mTotal]}/>
              <h3>Trend over Time</h3>
              <PopulationGraph className="pop-graph" data={this.state.timeSeries} />
              <CMDLink className="cmd-pop"
                localAuth={this.props.localAuth}
                dataset="mid-year-pop-est"
                body={body}
                icon="dark"
                 />
            </div>
          </div>
           : null}
      </div>
    )
  }
}

export default PopulationData
