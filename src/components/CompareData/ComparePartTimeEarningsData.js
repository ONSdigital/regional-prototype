import React, {Component} from 'react';
import {getPartTimeEarnings, getPartTimeEarningsMale, getPartTimeEarningsFemale } from '../../api/RequestHandler';
import CompareEarningsChart from '../CompareCharts/CompareEarningsChart';
import {saveSvgAsPng} from 'save-svg-as-png';
import CMDLink from '../CMDLink';

class ComparePartTimeEarningsData extends Component {
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

  async componentDidMount() {
    let that = this
    let count = 0
    let localAuthority = {}
    this.props.localAuth.forEach(function(item) {
      localAuthority[item.id] = {all: [], male: [], female: []}
      getPartTimeEarnings(item.id, 7)
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
      getPartTimeEarningsMale(item.id, 7)
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
      getPartTimeEarningsFemale(item.id, 7)
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
    let figure = "No data*"
    let cv = ''
    data.forEach(function(i) {
      if (i.x === date) {
        figure = `£${i.y.toLocaleString('en')}`
        cv = ` \u00B1${i.cv}`
      }
    })
    return (<span>{figure} <sub>{cv}</sub></span>)
  }

  handleDownload(e) {
    saveSvgAsPng(document.getElementById(e.target.value), `${e.target.value}.png`, {scale: 2});
  }

    render() {
      this.handleShowAll = this.handleShowAll.bind(this)
      this.handleShowMale = this.handleShowMale.bind(this)
      this.handleShowFemale = this.handleShowFemale.bind(this)
      let id = "earningsPTComparisonAll"
      if(this.state.showAll) {
        id = "earningsPTComparisonAll"
      }
      if(this.state.showMale) {
        id = "earningsPTComparisonMale"
      }
      if(this.state.showFemale) {
        id = "earningsPTComparisonFemale"
      }
      let body = '{"name": "earnings", "options": [ "annual-pay-gross" ] }, { "name": "sex", "options": [ "all", "female", "male" ] }, {"name": "statistics", "options": [ "median" ] }, { "name": "time", "options": [ "2017" ] }, { "name": "workingpattern", "options": ["part-time"] }'
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
              <div className="col-12">
                <p>The &#177; value represents the coefficient of variation (CV) and shows the extent of variability expressed as a percentage.</p>
                <p>*Estimates with a Coefficient of variation greater than 20% are suppressed from publication on quality grounds, along with those for which there is a risk of disclosure of individual employees or employers.</p>
              </div>
            </div>
            : null
          }
          {this.state.loaded ?
            <div className="row justify-content-md-center">
              <div className="col-12 radio-buttons">
                <form>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="ptAll" value="option1" checked={this.state.showAll} onChange={this.handleShowAll}/>
                    <label className="form-check-label" htmlFor="ptAll">All</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="ptMale" value="option2" checked={this.state.showMale} onChange={this.handleShowMale} />
                    <label className="form-check-label" htmlFor="ptMale">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="ptFemale" value="option3" checked={this.state.showFemale} onChange={this.handleShowFemale}/>
                    <label className="form-check-label" htmlFor="inlineRadio3">Female</label>
                  </div>
                </form>
              </div>
              <div id={id} className="col-8">
                <CompareEarningsChart partTime={true} localAuth={this.props.localAuth} data={this.state.data} showAll={this.state.showAll} showMale={this.state.showMale} showFemale={this.state.showFemale}/>
                <CMDLink
                  localAuth={this.props.localAuth}
                  dataset="ashe-table-7-earnings"
                  body={body}
                  icon="dark"
                   />
                {this.state.showAll ? <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value="comparePTEarningsAll">Save this chart</button> : null}
                {this.state.showMale ? <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value="comparePTEarningsMale">Save this chart</button> : null}
                {this.state.showFemale ? <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value="comparePTEarningsFemale">Save this chart</button> : null}
              </div>
            </div>
          : null}
        </div>


      )
    }
}

export default ComparePartTimeEarningsData
