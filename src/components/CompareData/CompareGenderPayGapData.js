import React, { Component } from 'react';
import CompareGenderPayGapChart from '../CompareCharts/CompareGenderPayGapChart';
import {getHourlyEarnings} from '../../api/RequestHandler';
import CMDLink from '../CMDLink';
import {saveSvgAsPng} from 'save-svg-as-png';

class CompareGenderPayGapData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      paygapData: {},
      date: 2017,
      fullTime: [],
      partTime: [],
      all: [],
      loaded: false,
      showAll: true,
      showFT: false,
      showPT: false,
      error: false
    }
  }

  componentDidMount() {
    let that = this
    let count = 0
    let localAuthority = {}
    this.props.localAuth.forEach(function(localAuth) {
      localAuthority[localAuth.id] = {all: {male: [], female: []}, partTime: {male: [], female: []}, fullTime: {male:[], female: []}}
      getHourlyEarnings(localAuth.id, "full-time", "male", 7)
        .then((response) => {
          count = count + 1
          response.observations.forEach(function(item) {
            if(item.observation === "") {
              localAuthority[localAuth.id]["fullTime"]["male"].push({x: Number(item.dimensions.Time.label), y: 0})
            } else {
              localAuthority[localAuth.id]["fullTime"]["male"].push({x: Number(item.dimensions.Time.label) , y: Number(item.observation)})
            }
          })
          if (count === that.props.localAuth.length * 6) {
            that.setState({
              loaded: true
            })
          }
        })
        .catch((error) => that.setState({error: true}))

      getHourlyEarnings(localAuth.id, "full-time", "female", 7)
        .then((response) => {
          count = count + 1
          response.observations.forEach(function(item) {
            if(item.observation === "") {
              localAuthority[localAuth.id]['fullTime']["female"].push({x: Number(item.dimensions.Time.label), y: 0})
            } else {
              localAuthority[localAuth.id]['fullTime']["female"].push({x: Number(item.dimensions.Time.label) , y: Number(item.observation)})
            }
          })
          if (count === (that.props.localAuth.length * 6)) {
            that.setState({
              loaded: true
            })
          }
        })
        .catch((error) => that.setState({error: true}))

      getHourlyEarnings(localAuth.id, "part-time", "male", 7)
        .then((response) => {
          count = count + 1
          response.observations.forEach(function(item) {
            if(item.observation === "") {
              localAuthority[localAuth.id]['partTime']["male"].push({x: Number(item.dimensions.Time.label), y: 0})
            } else {
              localAuthority[localAuth.id]['partTime']["male"].push({x: Number(item.dimensions.Time.label) , y: Number(item.observation)})
            }
          })
          if (count === (that.props.localAuth.length * 6)) {
            that.setState({
              loaded: true
            })
          }
        })
        .catch((error) => that.setState({error: true}))

      getHourlyEarnings(localAuth.id, "part-time", "female", 7)
        .then((response) => {
          count = count + 1
          response.observations.forEach(function(item) {
            if(item.observation === "") {
              localAuthority[localAuth.id]['partTime']["female"].push({x: Number(item.dimensions.Time.label), y: 0})
            } else {
              localAuthority[localAuth.id]['partTime']["female"].push({x: Number(item.dimensions.Time.label) , y: Number(item.observation)})
            }
          })
          if (count === (that.props.localAuth.length * 6)) {
            that.setState({
              loaded: true
            })
          }
        })
        .catch((error) => that.setState({error: true}))

      getHourlyEarnings(localAuth.id, "all", "male", 7)
        .then((response) => {
          count = count + 1
          response.observations.forEach(function(item) {
            if(item.observation === "") {
              localAuthority[localAuth.id]['all']["male"].push({x: Number(item.dimensions.Time.label), y: 0})
            } else {
              localAuthority[localAuth.id]['all']["male"].push({x: Number(item.dimensions.Time.label) , y: Number(item.observation)})
            }
          })
          if (count === (that.props.localAuth.length * 6)) {
            that.setState({
              loaded: true
            })
          }
        })
        .catch((error) => that.setState({error: true}))

      getHourlyEarnings(localAuth.id, "all", "female", 7)
        .then((response) => {
          count = count + 1
          response.observations.forEach(function(item) {
            if(item.observation === "") {
              localAuthority[localAuth.id]['all']["female"].push({x: Number(item.dimensions.Time.label), y: 0})
            } else {
              localAuthority[localAuth.id]['all']["female"].push({x: Number(item.dimensions.Time.label) , y: Number(item.observation)})
            }
          })
          if (count === (that.props.localAuth.length * 6)) {
            that.setState({
              loaded: true
            })
          }
        })
        .catch((error) => that.setState({error: true}))
    })

    this.setState({
      data: localAuthority
    })
  }

  handleShowAll() {
    this.setState({
      showAll: true,
      showFT: false,
      showPT: false
    })
  }
  handleShowFT() {
    this.setState({
      showAll: false,
      showFT: true,
      showPT: false
    })
  }
  handleShowPT() {
    this.setState({
      showAll: false,
      showFT: false,
      showPT: true
    })
  }

  getPercentage(female, male, date) {
    let figure = 0
    female.forEach(function(f) {
      male.forEach(function(m) {
        if(f.x === m.x && f.x === date && m.x === date) {
          if(f.y === 0 || m.y === 0) {
            figure = "No data*"
          } else {
             figure = (((m.y - f.y) / m.y) * 100).toFixed(2) + '%'
          }
        }
      })
    })
    return figure
  }

  handleDate(e) {
    this.setState({
      date: Number(e.target.value)
    })
  }

  handleDownload(e) {
    saveSvgAsPng(document.getElementById(e.target.value), `${e.target.value}.png`, {scale: 2});
  }

  render() {
    this.handleShowAll = this.handleShowAll.bind(this)
    this.handleShowFT = this.handleShowFT.bind(this)
    this.handleShowPT = this.handleShowPT.bind(this)
    let fullTime = this.state.fullTime.filter((date) =>
        date.x === this.state.date ? date : null
      )
    let partTime = this.state.partTime.filter((date) =>
        date.x === this.state.date ? date : null
      )
    let all = this.state.all.filter((date) =>
        date.x === this.state.date ? date : null
      )
    let body = '{"name": "earnings", "options": [ "hourly-pay-excluding-overtime" ] }, { "name": "sex", "options": [ "all", "female", "male" ] }, {"name": "statistics", "options": [ "median" ] }, { "name": "time", "options": [ "2017" ] }, { "name": "workingpattern", "options": ["part-time", "full-time", "all"] }'
    let id = "GPG-all"
    if(this.state.showAll) {
      id = "GPG-all"
    }
    if(this.state.showFT) {
      id = "GPG-FT"
    }
    if(this.state.showPT) {
      id = "GPG-PT"
    }
    return (
      <div>
        {this.state.loaded ?
          <div className="row justify-content-md-center">
            <div className="col-12">
              {this.state.loaded ?
                <div className="key-figures">
                  <form>
                    <div className="form-group row margin-left--1">
                      <label htmlFor="exampleFormControlSelect1">Key Figures:</label>
                      <select onChange={(e)=> {this.handleDate(e)}} className="col-2 form-control" id="exampleFormControlSelect1">
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                      </select>
                    </div>
                  </form>
                </div>
                : null}
            </div>
            {Object.keys(this.state.data).map((item, key) =>
              <div key={key} className="col">
                <table>
                  <tbody>
                    <tr>
                      <td><strong>All:</strong></td>
                      <td>{this.getPercentage(this.state.data[item]['all']['female'], this.state.data[item]['all']['male'], this.state.date)}</td>
                    </tr>
                    <tr>
                      <td><strong>Full-Time:</strong></td>
                      <td>{this.getPercentage(this.state.data[item]['fullTime']['female'], this.state.data[item]['fullTime']['male'], this.state.date)}</td>
                    </tr>
                    <tr>
                      <td><strong>Part-Time:</strong></td>
                      <td>{this.getPercentage(this.state.data[item]['partTime']['female'], this.state.data[item]['partTime']['male'], this.state.date)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <p>*Estimates with a Coefficient of variation greater than 20% are suppressed from publication on quality grounds, along with those for which there is a risk of disclosure of individual employees or employers.</p>
          </div>
           : null}
        {this.state.loaded ?
          <div className="row justify-content-md-center">
            <div className="col-12 radio-buttons">
              <form>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked={this.state.showAll} onChange={this.handleShowAll}/>
                  <label className="form-check-label" htmlFor="inlineRadio1">All working patterns</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" checked={this.state.showFT} onChange={this.handleShowFT} />
                  <label className="form-check-label" htmlFor="inlineRadio2">Full-Time</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" checked={this.state.showPT} onChange={this.handleShowPT}/>
                  <label className="form-check-label" htmlFor="inlineRadio3">Part-Time</label>
                </div>
              </form>
            </div>
            <div id={id} className="col-lg-8 col-md-10">
              <CompareGenderPayGapChart compare={true} data={this.state.data} localAuth={this.props.localAuth} showAll={this.state.showAll} showFT={this.state.showFT} showPT={this.state.showPT}/>
              {this.state.showAll ? <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value='compare-GPG-all'>Save this chart</button> : null}
              {this.state.showFT ? <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value='compare-GPG-FT'>Save this chart</button> : null}
              {this.state.showPT ? <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value='compare-GPG-PT'>Save this chart</button> : null}
            </div>
          </div>
          : null}

      </div>
    )
  }
}

export default CompareGenderPayGapData;
