import React, { Component } from 'react';
import { getHourlyEarnings } from '../../api/RequestHandler';
import EarningsChart from '../Charts/EarningsChart';
import CMDLink from '../CMDLink';
import {saveSvgAsPng} from 'save-svg-as-png';

class PartTimeHourlyEarningsData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pow: {
        all: [],
        male: [],
        female: [],
      },
      por: {
        all: [],
        male: [],
        female: [],
      },
      date: 2017,
      showPOW: true,
      showPOR: false,
      loaded: false,
      error: false,
      noDataCount: 0
    }
  }

  async componentDidMount () {
    let that = this

    await getHourlyEarnings(this.props.localAuth, "part-time", "all", 7)
      .then((response) => {
        response.observations.forEach(function(time) {
          if (time.observation === '') {
            that.setState({
              noDataCount: that.state.noDataCount + 1
            })
          } else {
            that.setState({
              pow: {
                ...that.state.pow,
                all: [...that.state.pow.all, {x: Number(time.dimensions.Time.label), y: Number(time.observation), cv: time.metadata["Coefficient of variation"]}]
              }
            })
          }
        })
      })
      .catch((error) => this.setState({error: true}))

    await getHourlyEarnings(this.props.localAuth, "part-time", "male", 7)
      .then((response) => {
        response.observations.forEach(function(time) {
          if(time.observation === '') {
            that.setState({
              noDataCount: that.state.noDataCount + 1
            })
          } else {
            that.setState({
              pow: {
                ...that.state.pow,
                male: [...that.state.pow.male, {x: Number(time.dimensions.Time.label), y: Number(time.observation), cv: time.metadata["Coefficient of variation"]}]
              }
            })
          }
        })
      })
      .catch((error) => this.setState({error: true}))

    await getHourlyEarnings(this.props.localAuth, "part-time", "female", 7)
      .then((response) => {
        response.observations.forEach(function(time) {
          if(time.observation === '') {
            that.setState({
              noDataCount: that.state.noDataCount + 1
            })
          } else {
            that.setState({
              pow: {
                ...that.state.pow,
                female: [...that.state.pow.female, {x: Number(time.dimensions.Time.label), y: Number(time.observation), cv: time.metadata["Coefficient of variation"]}]
              }
            })
          }

        })
      })
      .catch((error) => this.setState({error: true}))

      await getHourlyEarnings(this.props.localAuth, "part-time", "all", 8)
        .then((response) => {
          response.observations.forEach(function(time) {
            if (time.observation === '') {
              that.setState({
                noDataCount: that.state.noDataCount + 1
              })
            } else {
              that.setState({
                por: {
                  ...that.state.por,
                  all: [...that.state.por.all, {x: Number(time.dimensions.Time.label), y: Number(time.observation), cv: time.metadata["Coefficient of variation"]}]
                }
              })
            }
          })
        })
        .catch((error) => this.setState({error: true}))

      await getHourlyEarnings(this.props.localAuth, "part-time", "male", 8)
        .then((response) => {
          response.observations.forEach(function(time) {
            if(time.observation === '') {
              that.setState({
                noDataCount: that.state.noDataCount + 1
              })
            } else {
              that.setState({
                por: {
                  ...that.state.por,
                  male: [...that.state.por.male, {x: Number(time.dimensions.Time.label), y: Number(time.observation), cv: time.metadata["Coefficient of variation"]}]
                }
              })
            }
          })
        })
        .catch((error) => this.setState({error: true}))

      await getHourlyEarnings(this.props.localAuth, "part-time", "female", 8)
        .then((response) => {
          response.observations.forEach(function(time) {
            if(time.observation === '') {
              that.setState({
                noDataCount: that.state.noDataCount + 1
              })
            } else {
              that.setState({
                por: {
                  ...that.state.por,
                  female: [...that.state.por.female, {x: Number(time.dimensions.Time.label), y: Number(time.observation), cv: time.metadata["Coefficient of variation"]}]
                }
              })
            }
          })
        })
        .catch((error) => this.setState({error: true}))

    this.setDate([...this.state.pow.all, ...this.state.pow.male, ...this.state.pow.female])

    this.setState({
      loaded: true
    })

    if(this.state.error) {
      this.props.errorCount()
    }
  }

  setDate(array) {
    let that = this
    let data = []
    array.forEach(function(date) {
      data.push(date.x)
    })
    if (data.length === array.length) {
      that.setState({
          date: that.getHighest(data)
      })
    }
  }

  getHighest(array) {
    return Math.max.apply(Math, array);
  }

  handleChange(e) {
    if(e.target.value === "showPOR") {
      this.setState({
        showPOR: true,
        showPOW: false
      })
    } else if(e.target.value === "showPOW") {
      this.setState({
        showPOR: false,
        showPOW: true
      })
    }
  }

  handleDownload(e) {
    saveSvgAsPng(document.getElementById(e.target.value), `${e.target.value}.png`);
  }

  render() {
    let powMale = this.state.pow.male.filter((date) =>
        date.x === this.state.date ? date : null
      )
    let powFemale = this.state.pow.female.filter((date) =>
        date.x === this.state.date ? date : null
      )
    let powAll= this.state.pow.all.filter((date) =>
        date.x === this.state.date ? date : null
      )
    let porMale = this.state.por.male.filter((date) =>
        date.x === this.state.date ? date : null
      )
    let porFemale = this.state.por.female.filter((date) =>
        date.x === this.state.date ? date : null
      )
    let porAll= this.state.por.all.filter((date) =>
        date.x === this.state.date ? date : null
      )
    let body = '{"name": "earnings", "options": [ "hourly-pay-excluding-overtime" ] }, { "name": "sex", "options": [ "all", "female", "male" ] }, {"name": "statistics", "options": [ "median" ] }, { "name": "time", "options": [ "2017" ] }, { "name": "workingpattern", "options": ["part-time"] }'

    return (
      <div className="col-lg-5 col-md-10 col-sm-10">
        {this.props.show ?
          <div>
            {this.state.loaded && !this.state.error ?
              <div>
                  <div>
                    <h2>Hourly Earnings for Part-Time Workers</h2>
                    <h4>Key Figures ({this.state.date}):</h4>
                    <table className="earnings-table">
                      <caption>Comparison hourly earnings between place of work and place of residence</caption>
                      <tbody>
                        <tr>
                          <th></th>
                          <th>All</th>
                          <th>Male</th>
                          <th>Female</th>
                        </tr>
                        <tr>
                          <td><strong>Work in {this.props.localAuthLabel}</strong></td>
                          <td>
                            {powAll.length > 0 ? `£${powAll[0].y.toLocaleString('en')}` : "No data*"}
                             <sub>
                               &#177;{powAll.length > 0 ? `${powAll[0].cv}%` : null}
                             </sub>
                          </td>
                          <td>
                            {powMale.length > 0 ? `£${powMale[0].y.toLocaleString('en')}` : "No data*"}
                             <sub>
                               &#177;{powMale.length > 0 ? `${powMale[0].cv}%` : null}
                             </sub>
                          </td>
                          <td>
                            {powFemale.length > 0 ? `£${powFemale[0].y.toLocaleString('en')}` : "No data*"}
                             <sub>
                               &#177;{powFemale.length > 0 ? `${powFemale[0].cv}%` : null}
                             </sub>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Live in {this.props.localAuthLabel}</strong></td>
                            <td>
                              {porAll.length > 0 ? `£${porAll[0].y.toLocaleString('en')}` : "No data*"}
                              <sub>
                                &#177;{porAll.length > 0 ? `${porAll[0].cv}%` : null}
                              </sub>
                            </td>
                            <td>
                              {porMale.length > 0 ? `£${porMale[0].y.toLocaleString('en')}` : "No data*"}
                              <sub>
                                &#177;{porMale.length > 0 ? `${porMale[0].cv}%` : null}
                              </sub>
                            </td>
                            <td>
                              {porFemale.length > 0 ? `£${porFemale[0].y.toLocaleString('en')}` : "No data*"}
                              <sub>
                                &#177;{porFemale.length > 0 ? `${porFemale[0].cv}%` : null}
                              </sub>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                    <h4>Select which graph to show:</h4>
                    <form>
                      <div className="form-group row">
                        <select onChange={(e)=> {this.handleChange(e)}} className="col form-control" id="exampleFormControlSelect1">
                          <option value="showPOW">Work in {this.props.localAuthLabel}</option>
                          <option value="showPOR">Live in {this.props.localAuthLabel}</option>
                        </select>
                      </div>
                    </form>
                    {this.state.showPOW ?
                      <div id="pow-FT">
                        <EarningsChart localAuth={this.props.localAuth} fullTime={true} showPOW={this.state.showPOW} dataFull={this.state.pow.all} dataMale={this.state.pow.male} dataFemale={this.state.pow.female}/>
                        <CMDLink
                          localAuth={this.props.localAuth}
                          dataset="ashe-table-7-earnings"
                          body={body}
                          icon="dark"
                           />
                         <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value={this.props.localAuth + '-pow-FT'}>Save this chart</button>
                      </div>
                       :
                       null
                     }
                    {this.state.showPOR ?
                      <div id="por-FT">
                        <EarningsChart localAuth={this.props.localAuth} fullTime={true}  showPOR={this.state.showPOR} dataFull={this.state.por.all} dataMale={this.state.por.male} dataFemale={this.state.por.female}/>
                        <CMDLink
                          localAuth={this.props.localAuth}
                          dataset="ashe-table-8-earnings"
                          body={body}
                          icon="dark"
                           />
                         <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value={this.props.localAuth + '-por-FT'}>Save this chart</button>
                      </div>
                       :
                       null
                     }
                  </div>
              </div>
                :
              <div>
                <h3>Hourly Earnings for Full Time workers</h3>
                <p>The service is unavailable, please check our <a href="https://twitter.com/onsdigital">twitter</a> feed for updates.</p>
                <p>If you still encounter problems please <a href="mailto: web.comments@ons.gov.uk">contact us</a>. We apologise for any inconvenience this may have caused.</p>
              </div>
              }
          </div>
          : null}
      </div>

    )
  }
}

export default PartTimeHourlyEarningsData
