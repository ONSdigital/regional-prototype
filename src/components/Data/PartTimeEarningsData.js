import React, { Component } from 'react';
import { getPartTimeEarnings, getPartTimeEarningsMale, getPartTimeEarningsFemale } from '../../api/RequestHandler';
import EarningsChart from '../Charts/EarningsChart';
import CMDLink from '../CMDLink';
import {saveSvgAsPng} from 'save-svg-as-png';

class PartTimeEarningsData extends Component {
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
      loaded: false
    }
  }

  async componentDidMount () {
    let that = this
    await getPartTimeEarnings(this.props.localAuth, 7)
      .then((response) => {
        response.observations.forEach(function(time) {
          if (time.observation === '') {
            return null
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

    await getPartTimeEarningsMale(this.props.localAuth, 7)
      .then((response) => {
        response.observations.forEach(function(time) {
          if(time.observation === '') {
            return null
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

    await getPartTimeEarningsFemale(this.props.localAuth, 7)
      .then((response) => {
        response.observations.forEach(function(time) {
          if(time.observation === '') {
            return null
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

      await getPartTimeEarnings(this.props.localAuth, 8)
        .then((response) => {
          response.observations.forEach(function(time) {
            if (time.observation === '') {
              return null
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

      await getPartTimeEarningsMale(this.props.localAuth, 8)
        .then((response) => {
          response.observations.forEach(function(time) {
            if(time.observation === '') {
              return null
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

      await getPartTimeEarningsFemale(this.props.localAuth, 8)
        .then((response) => {
          response.observations.forEach(function(time) {
            if(time.observation === '') {
              return null
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

    this.setDate([...this.state.pow.all, ...this.state.pow.male, ...this.state.pow.female])

    this.setState({
      loaded: true
    })
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
    let body = '{"name": "earnings", "options": [ "annual-pay-gross" ] }, { "name": "sex", "options": [ "all", "female", "male" ] }, {"name": "statistics", "options": [ "median" ] }, { "name": "time", "options": [ "2017" ] }, { "name": "workingpattern", "options": ["part-time"] }'
    return (
      <div className="col-5">
        {this.props.show ?
          <div>
            {this.state.loaded ?
              <div>
                <h3>Part Time</h3>
                <h4>Key Figures ({this.state.date}):</h4>
                <table className="earnings-table">
                  <caption>Comparison of annual summary of earnings between place of work and place of residence</caption>
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
                           &#177;{powAll.length > 0 ? `${powAll[0].cv}` : null}
                         </sub>
                      </td>
                      <td>
                        {powMale.length > 0 ? `£${powMale[0].y.toLocaleString('en')}` : "No data*"}
                         <sub>
                           &#177;{powMale.length > 0 ? `${powMale[0].cv}` : null}
                         </sub>
                      </td>
                      <td>
                        {powFemale.length > 0 ? `£${powFemale[0].y.toLocaleString('en')}` : "No data*"}
                         <sub>
                           &#177;{powFemale.length > 0 ? `${powFemale[0].cv}` : null}
                         </sub>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Live in {this.props.localAuthLabel}</strong></td>
                        <td>
                          {porAll.length > 0 ? `£${porAll[0].y.toLocaleString('en')}` : "No data*"}
                          <sub>
                            &#177;{porAll.length > 0 ? `${porAll[0].cv}` : null}
                          </sub>
                        </td>
                        <td>
                          {porMale.length > 0 ? `£${porMale[0].y.toLocaleString('en')}` : "No data*"}
                          <sub>
                            &#177;{porMale.length > 0 ? `${porMale[0].cv}` : null}
                          </sub>
                        </td>
                        <td>
                          {porFemale.length > 0 ? `£${porFemale[0].y.toLocaleString('en')}` : "No data*"}
                          <sub>
                            &#177;{porFemale.length > 0 ? `${porFemale[0].cv}` : null}
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
                  <div id="pow-PT">
                    <EarningsChart localAuth={this.props.localAuth} partTime={true} showPOW={this.state.showPOW} dataFull={this.state.pow.all} dataMale={this.state.pow.male} dataFemale={this.state.pow.female}/>
                    <CMDLink
                      localAuth={this.props.localAuth}
                      dataset="ashe-table-7-earnings"
                      body={body}
                      icon="dark"
                       />
                     <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value={this.props.localAuth + '-pow-PT'}>Save this chart</button>
                  </div>
                   :
                   null
                 }
                 {this.state.showPOR ?
                   <div id="por-PT">
                     <EarningsChart localAuth={this.props.localAuth} partTime={true} showPOR={this.state.showPOR} dataFull={this.state.por.all} dataMale={this.state.por.male} dataFemale={this.state.por.female}/>
                     <CMDLink
                       localAuth={this.props.localAuth}
                       dataset="ashe-table-8-earnings"
                       body={body}
                       icon="dark"
                        />
                      <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value={this.props.localAuth + '-por-PT'}>Save this chart</button>
                   </div>
                    :
                    null
                  }
              </div>
              :
              <div>
                <h3>Part Time</h3>
                <p>The service is temporarily unavailable, please check our <a href="https://twitter.com/onsdigital">twitter</a> feed for updates.</p>
                <p>If you still encounter problems please <a href="mailto: web.comments@ons.gov.uk">contact us</a>. We apologise for any inconvenience this may have caused.</p>
              </div>
            }
          </div>
          : null}
      </div>

    )
  }
}

export default PartTimeEarningsData
