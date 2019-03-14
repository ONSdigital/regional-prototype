import React, { Component } from 'react';
import { getPop, getMalePop, getFemalePop } from '../../api/RequestHandler';
import PopulationPyramid from '../Charts/PopulationPyramid';
import PopulationPie from '../Charts/PopulationPie';
import PopulationGraph from '../Charts/PopulationGraph';
import CMDLink from '../CMDLink';
import {saveSvgAsPng} from 'save-svg-as-png';

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

  handleDownload(e, scale) {
    saveSvgAsPng(document.getElementById(e.target.value), `${e.target.value}.png`, {scale: scale});
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
              <PopulationPyramid localAuth={this.props.localAuth} totalPop={this.state.total} fData={this.state.fData.sort(this.compareNumbers)} mData={this.state.mData.sort(this.compareNumbers)} />
              <CMDLink
                localAuth={this.props.localAuth}
                dataset="mid-year-pop-est"
                body={body}
                icon="dark"
                 />
               <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e, 2.5)}} value={this.props.localAuth + '-populationPyramid'}>Save this chart</button>
            </div>
            <div className="col-5 pop-graph">
              <h3>Sex</h3>
              <PopulationPie localAuth={this.props.localAuth} data={[this.state.fTotal, this.state.mTotal]}/>
              <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e, 5)}} value={this.props.localAuth + '-populationPie'}>Save this chart</button>
              <h3>Trend over Time</h3>
              <div id="popGraph">
                <PopulationGraph localAuth={this.props.localAuth} className="pop-graph" data={this.state.timeSeries} />
                <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e, 1)}} value={this.props.localAuth + '-populationGraph'}>Save this chart</button>
              </div>
            </div>
          </div>
           : null}
      </div>
    )
  }
}

export default PopulationData
