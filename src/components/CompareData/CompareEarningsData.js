import React, {Component} from 'react';
import {getEarnings, getEarningsMale, getEarningsFemale } from '../../api/RequestHandler';
import CompareEarningsChart from '../CompareCharts/CompareEarningsChart';

class CompareEarningsData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      loaded: false,
      showAll: true,
      showMale: false,
      showFemale: false,
      date: 2017,
    }
  }

  componentDidMount() {
    let that = this
    let count = 0
    let localAuthority = {}
    this.props.localAuth.forEach(function(item) {
      localAuthority[item.id] = {all: [], male: [], female: []}
      getEarnings(item.id, 7)
      .then((response) => {
        count = count + 1
        response.observations.forEach(function(time) {
          if (time.observation === '') {
            return null
          } else {
            localAuthority[item.id]['all'].push({x: Number(time.dimensions.Time.label), y: Number(time.observation), cv: time.metadata["Coefficient of variation"]})
          }
        })
        if (count === (that.props.localAuth.length * 3)) {
          that.setState({
            loaded: true
          })
        }
      })
      getEarningsMale(item.id, 7)
      .then((response) => {
        count = count + 1
        response.observations.forEach(function(time) {
          if (time.observation === '') {
            return null
          } else {
            localAuthority[item.id]['male'].push({x: Number(time.dimensions.Time.label), y: Number(time.observation), cv: time.metadata["Coefficient of variation"]})
          }
        })
        if (count === (that.props.localAuth.length * 3)) {
          that.setState({
            loaded: true
          })
        }
      })
      getEarningsFemale(item.id, 7)
      .then((response) => {
        count = count + 1
        response.observations.forEach(function(time) {
          if (time.observation === '') {
            return null
          } else {
            localAuthority[item.id]['female'].push({x: Number(time.dimensions.Time.label), y: Number(time.observation), cv: time.metadata["Coefficient of variation"]})
          }
        })
        if (count === (that.props.localAuth.length * 3)) {
          that.setState({
            loaded: true
          })
        }
      })
    })

    this.setState({
      data: localAuthority
    })
  }

  handleShowAll() {
    this.setState({
      showAll: true,
      showMale: false,
      showFemale: false
    })
  }
  handleShowMale() {
    this.setState({
      showAll: false,
      showMale: true,
      showFemale: false
    })
  }
  handleShowFemale() {
    this.setState({
      showAll: false,
      showMale: false,
      showFemale: true
    })
  }

  handleDate(e) {
    this.setState({
      date: Number(e.target.value)
    })
  }

  getFigure(data, date) {
    let figure = "No data"
    let cv
    data.forEach(function(i) {
      if (i.x === date) {
        figure = `£${i.y.toLocaleString('en')}`
        cv = ` \u00B1${i.cv}`
      }
    })
    return (<span>{figure}<sub> {cv}</sub></span>)
  }

    render() {
      this.handleShowAll = this.handleShowAll.bind(this)
      this.handleShowMale = this.handleShowMale.bind(this)
      this.handleShowFemale = this.handleShowFemale.bind(this)
      return(
        <div>
          {this.state.loaded ?
            <div className="key-figures">
              <form>
                <div className="form-group row">
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
          {this.state.loaded ?
            <div className="row justify-content-md-center">
              {Object.keys(this.state.data).map((item, key) =>
                <div key={key} className="col">
                  <table>
                    <tbody>
                      <tr>
                        <td><strong>All:</strong></td>
                        <td>{this.getFigure(this.state.data[item]['all'], this.state.date)}</td>
                      </tr>
                      <tr>
                        <td><strong>Male:</strong></td>
                        <td>{this.getFigure(this.state.data[item]['male'], this.state.date)}</td>
                      </tr>
                      <tr>
                        <td><strong>Female:</strong></td>
                        <td>{this.getFigure(this.state.data[item]['female'], this.state.date)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            : null
          }
          {this.state.loaded ?
            <div className="row justify-content-md-center">
              <div className="col-12 radio-buttons">
                <form>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked={this.state.showAll} onChange={this.handleShowAll}/>
                    <label className="form-check-label" htmlFor="inlineRadio1">All</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" checked={this.state.showMale} onChange={this.handleShowMale} />
                    <label className="form-check-label" htmlFor="inlineRadio2">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" checked={this.state.showFemale} onChange={this.handleShowFemale}/>
                    <label className="form-check-label" htmlFor="inlineRadio3">Female</label>
                  </div>
                </form>
              </div>
              <div className="col-8">
                <CompareEarningsChart localAuth={this.props.localAuth} data={this.state.data} showAll={this.state.showAll} showMale={this.state.showMale} showFemale={this.state.showFemale}/>
              </div>
            </div>
          : null}
        </div>


      )
    }
}

export default CompareEarningsData
