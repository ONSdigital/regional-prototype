import React, {Component} from 'react';
import {getPartTimeEarnings, getPartTimeEarningsMale, getPartTimeEarningsFemale } from '../../api/RequestHandler';
import CompareEarningsChart from '../CompareCharts/CompareEarningsChart';

class ComparePartTimeEarningsData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      loadedAll: false,
      loadedMale: false,
      loadedFemale: false,
      showAll: true,
      showMale: false,
      showFemale: false
    }
  }

  async componentDidMount() {
    let that = this
    let localAuthority = {}
    this.props.localAuth.forEach(function(item) {
      localAuthority[item.id] = {all: [], male: [], female: []}
      getPartTimeEarnings(item.id)
      .then((response) => {
        response.observations.forEach(function(time) {
          if (time.observation === '') {
            return null
          } else {
            localAuthority[item.id]['all'].push({x: Number(time.dimensions.Time.label), y: Number(time.observation)})
          }
          that.setState({
            loadedAll: true
          })
        })
      })
      getPartTimeEarningsMale(item.id)
      .then((response) => {
        response.observations.forEach(function(time) {
          if (time.observation === '') {
            return null
          } else {
            localAuthority[item.id]['male'].push({x: Number(time.dimensions.Time.label), y: Number(time.observation)})
          }
          that.setState({
            loadedMale: true
          })
        })
      })
      getPartTimeEarningsFemale(item.id)
      .then((response) => {
        response.observations.forEach(function(time) {
          if (time.observation === '') {
            return null
          } else {
            localAuthority[item.id]['female'].push({x: Number(time.dimensions.Time.label), y: Number(time.observation)})
          }
          that.setState({
            loadedFemale: true
          })
        })
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

    render() {
      this.handleShowAll = this.handleShowAll.bind(this)
      this.handleShowMale = this.handleShowMale.bind(this)
      this.handleShowFemale = this.handleShowFemale.bind(this)
      return(
        <div>
          {this.state.loadedAll && this.state.loadedMale && this.state.loadedFemale ?
            <div className="row justify-content-md-center">
              {Object.keys(this.state.data).map((item, key) =>
                <div className="col">
                  <table>
                    <tr><td><strong>All:</strong> {this.state.data[item]['all'].map((item, index) => index === 0 ? `£${item.y.toLocaleString('en')} (${item.x})` : null)}</td></tr>
                    <tr><td><strong>Male:</strong> {this.state.data[item]['male'].map((item, index) => index === 0 ? `£${item.y.toLocaleString('en')} (${item.x})` : null)}</td></tr>
                    <tr><td><strong>Female:</strong> {this.state.data[item]['female'].map((item, index) => index === 0 ? `£${item.y.toLocaleString('en')} (${item.x})` : null)}</td></tr>
                  </table>
                </div>
              )}
            </div>
            : null
          }
          {this.state.loadedAll && this.state.loadedMale && this.state.loadedFemale ?
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
              <div className="col-8">
                <CompareEarningsChart localAuth={this.props.localAuth} data={this.state.data} showAll={this.state.showAll} showMale={this.state.showMale} showFemale={this.state.showFemale}/>
              </div>
            </div>
          : null}
        </div>


      )
    }
}

export default ComparePartTimeEarningsData
