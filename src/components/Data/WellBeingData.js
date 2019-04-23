import React, { Component } from 'react';
import { getLocalWellBeing, getUKWellBeing } from '../../api/RequestHandler';
import WellBeingChart from '../Charts/WellBeingChart';
import CMDLink from '../CMDLink';
import {saveSvgAsPng} from 'save-svg-as-png';

class WellBeingData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      ukAnxiety: [],
      ukHappiness: [],
      ukWorthwhile: [],
      ukLifeSatisfaction: [],
      localAnxiety: [],
      localHappiness: [],
      localWorthwhile: [],
      localLifeSatisfaction: [],
      date: "2017-18",
      noDataCount: 0,
      error: false
    }
  }

  async componentDidMount() {

    let that = this

    await getUKWellBeing('anxiety')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            that.setState({
              ukAnxiety: [...that.state.ukAnxiety, {x: item.dimensions.estimate.label, y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
            })
          }
        })
      })
      .catch((error) => this.setState({error: true}))

    await getUKWellBeing('happiness')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            that.setState({
              ukHappiness: [...that.state.ukHappiness, {x: item.dimensions.estimate.label, y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
            })
          }
        })
      })
      .catch((error) => this.setState({error: true}))

    await getUKWellBeing('worthwhile')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            that.setState({
              ukWorthwhile: [...that.state.ukWorthwhile, {x: item.dimensions.estimate.label, y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
            })
          }
        })
      })
      .catch((error) => this.setState({error: true}))

    await getUKWellBeing('life-satisfaction')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            that.setState({
              ukLifeSatisfaction: [...that.state.ukLifeSatisfaction, {x: item.dimensions.estimate.label, y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
            })
          }
        })
      })
      .catch((error) => this.setState({error: true}))

    await getLocalWellBeing(this.props.localAuth, "*", 'anxiety')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            if(item.metadata.data_markings === "x") {
              that.setState({
                localAnxiety: [...that.state.localAnxiety, {x: item.dimensions.estimate.label , y: 0, z: that.assignValue(item.dimensions.estimate.label)}],
                noDataCount: that.state.noDataCount + 1
              })
            } else {
              that.setState({
                localAnxiety: [...that.state.localAnxiety, {x: item.dimensions.estimate.label , y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
              })
            }
          }
        })
      })
      .catch((error) => this.setState({error: true}))

    await getLocalWellBeing(this.props.localAuth, "*", 'happiness')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            if(item.metadata.Data_Marking === "x") {
              that.setState({
                localHappiness: [...that.state.localHappiness, {x: item.dimensions.estimate.label , y: 0, z: that.assignValue(item.dimensions.estimate.label)}],
                noDataCount: that.state.noDataCount + 1
              })
            } else {
              that.setState({
                localHappiness: [...that.state.localHappiness, {x: item.dimensions.estimate.label , y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
              })
            }
          }
        })
      })
      .catch((error) => this.setState({error: true}))

    await getLocalWellBeing(this.props.localAuth, "*", 'worthwhile')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            if(item.metadata.Data_Marking === "x") {
              that.setState({
                localWorthwhile: [...that.state.localWorthwhile, {x: item.dimensions.estimate.label , y: 0, z: that.assignValue(item.dimensions.estimate.label)}],
                noDataCount: that.state.noDataCount + 1
              })
            } else {
              that.setState({
                localWorthwhile: [...that.state.localWorthwhile, {x: item.dimensions.estimate.label , y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
              })
            }
          }
        })
      })
      .catch((error) => this.setState({error: true}))

    await getLocalWellBeing(this.props.localAuth, "*", 'life-satisfaction')
      .then((response) => {
        response.observations.forEach(function(item) {
          if(item.dimensions.estimate.id !== "average-mean") {
            if(item.metadata.Data_Marking === "x") {
              that.setState({
                localLifeSatisfaction: [...that.state.localLifeSatisfaction, {x: item.dimensions.estimate.label , y: 0, z: that.assignValue(item.dimensions.estimate.label)}],
                noDataCount: that.state.noDataCount + 1
              })
            } else {
              that.setState({
                localLifeSatisfaction: [...that.state.localLifeSatisfaction, {x: item.dimensions.estimate.label , y: Number(item.observation), z: that.assignValue(item.dimensions.estimate.label)}]
              })
            }
          }
        })
      })
      .catch((error) => this.setState({error: true}))

    this.setState({
      loaded: true
    })
  }

  assignValue(value) {
    if (value === "Poor") {
      return 1
    } else if (value === "Fair") {
      return 2
    } else if (value === "Good") {
      return 3
    } else if (value ==="Very good") {
      return 4
    }
  }

  handleDate(e) {
    this.setState({
      date: e.target.value
    })
  }

  handleDownload(e) {
    saveSvgAsPng(document.getElementById(e.target.value), `${e.target.value}.png`, {scale: 2});
  }

  render() {
    let bodyAnxiety = '{ "name": "allmeasuresofwellbeing", "options": [ "anxiety" ] }, { "name": "estimate", "options": [ "average-mean", "fair", "good", "poor", "very-good" ] }, { "name": "time", "options": ["2017-18"] }'
    let bodyHappiness = '{ "name": "allmeasuresofwellbeing", "options": [ "happiness" ] }, { "name": "estimate", "options": [ "average-mean", "fair", "good", "poor", "very-good" ] }, { "name": "time", "options": ["2017-18"] }'
    let bodyWorthwhile = '{ "name": "allmeasuresofwellbeing", "options": [ "worthwhile" ] }, { "name": "estimate", "options": [ "average-mean", "fair", "good", "poor", "very-good" ] }, { "name": "time", "options": ["2017-18"] }'
    let bodyLifeSatisfaction = '{ "name": "allmeasuresofwellbeing", "options": [ "life-satisfaction" ] }, { "name": "estimate", "options": [ "average-mean", "fair", "good", "poor", "very-good" ] }, { "name": "time", "options": ["2017-18"] }'
    return (
      <div>
        {this.props.show && this.state.noDataCount === 12 ?
          <div className="row justify-content-md-center">
            <div className="col-10">
              <p>No well-being data is available for {this.props.localAuthLabel}, please check our <a href="https://twitter.com/onsdigital">twitter</a> feed for updates.</p>
            </div>
          </div>
            :
            <div>
              {this.state.loaded && this.props.show ?
                <div>
                  {!this.state.error ?
                    <div className="row justify-content-md-center">
                      <div className="col-10">
                        <h2>Well-being</h2>
                        <p>Estimates of anxiety, happiness, worthwhile and life satisfaction compared with the UK estimates for the year ending March 2018. </p>
                        <h4>Key Figures (2017-18):</h4>
                        <table className="wellbeing-table">
                          <tbody>
                            <tr>
                              <th></th>
                              <th className="table-border-left" colSpan="4">Anxiety</th>
                              <th className="table-border-left" colSpan="4">Happiness</th>
                              <th className="table-border-left" colSpan="4">Worthwhile</th>
                              <th className="table-border-left table-border-right" colSpan="4">Life Satisfaction</th>
                            </tr>
                            <tr>
                              <th></th>
                              <th className="table-border-left">Poor</th>
                              <th>Fair</th>
                              <th>Good</th>
                              <th>Very Good</th>
                              <th className="table-border-left">Poor</th>
                              <th>Fair</th>
                              <th>Good</th>
                              <th>Very Good</th>
                              <th className="table-border-left">Poor</th>
                              <th>Fair</th>
                              <th>Good</th>
                              <th>Very Good</th>
                              <th className="table-border-left">Poor</th>
                              <th>Fair</th>
                              <th>Good</th>
                              <th className="table-border-right">Very Good</th>
                            </tr>
                            <tr className="wellbeing-table-data">
                              <td>{this.props.localAuthLabel}</td>
                              {this.state.localAnxiety.sort((a,b) => a.z - b.z).map((item) => item.y === 0 ? <td>No data</td> :
                                <td>{item.y}</td>)}
                              {this.state.localHappiness.sort((a,b) => a.z - b.z).map((item) => item.y === 0 ? <td>No data</td> :
                                <td>{item.y}</td>)}
                              {this.state.localWorthwhile.sort((a,b) => a.z - b.z).map((item) => item.y === 0 ? <td>No data</td> :
                                <td>{item.y}</td>)}
                              {this.state.localLifeSatisfaction.sort((a,b) => a.z - b.z).map((item) => item.y === 0 ? <td>No data</td> :
                                <td>{item.y}</td>)}
                            </tr>
                            <tr className="wellbeing-table-data">
                              <td>UK</td>
                              {this.state.ukAnxiety.sort((a,b) => a.z - b.z).map((item) =>
                                <td>{item.y}</td>)}
                              {this.state.ukHappiness.sort((a,b) => a.z - b.z).map((item) =>
                                <td>{item.y}</td>)}
                              {this.state.ukWorthwhile.sort((a,b) => a.z - b.z).map((item) =>
                                <td>{item.y}</td>)}
                              {this.state.ukLifeSatisfaction.sort((a,b) => a.z - b.z).map((item) =>
                                <td>{item.y}</td>)}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div id="anxiety" className="col-lg-5 col-md-10 col-sm-10 wellbeing-col">
                        <h3>Anxiety</h3>
                        <WellBeingChart localAuth={this.props.localAuth} local={this.state.localAnxiety} uk={this.state.ukAnxiety} color={["rgb(15, 130, 67)", "#3B7A9E"]} title={this.props.localAuthLabel} />
                        <CMDLink className="cmd-wellbeing"
                          localAuth={this.props.localAuth}
                          dataset="wellbeing-local-authority"
                          body={bodyAnxiety}
                          icon="dark"
                           />
                         <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value={this.props.localAuth + '-anxiety'}>Save this chart</button>
                      </div>
                      <div id="happiness" className="col-lg-5 col-md-10 col-sm-10 wellbeing-col">
                        <h3>Happiness</h3>
                        <WellBeingChart localAuth={this.props.localAuth} local={this.state.localHappiness} uk={this.state.ukHappiness} color={["rgb(255, 178, 76)", "#3B7A9E"]} title={this.props.localAuthLabel} />
                        <CMDLink className="cmd-happiness"
                          localAuth={this.props.localAuth}
                          dataset="wellbeing-local-authority"
                          body={bodyHappiness}
                          icon="dark"
                           />
                         <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value={this.props.localAuth + '-happiness'}>Save this chart</button>
                      </div>
                      <div id="worthwhile" className="col-lg-5 col-md-10 col-sm-10 wellbeing-col">
                        <h3>Worthwhile</h3>
                        <WellBeingChart localAuth={this.props.localAuth} local={this.state.localWorthwhile} uk={this.state.ukWorthwhile} color={["rgb(211, 47, 47)", "#3B7A9E"]} title={this.props.localAuthLabel}  />
                        <CMDLink className="cmd-worthwhile"
                          localAuth={this.props.localAuth}
                          dataset="wellbeing-local-authority"
                          body={bodyWorthwhile}
                          icon="dark"
                           />
                         <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value={this.props.localAuth + '-worthwhile'}>Save this chart</button>
                      </div>
                      <div id="lifeSatisfaction" className="col-lg-5 col-md-10 col-sm-10 wellbeing-col">
                        <h3>Life Satisfaction</h3>
                        <WellBeingChart localAuth={this.props.localAuth} local={this.state.localLifeSatisfaction} uk={this.state.ukLifeSatisfaction} color={["purple", "#3B7A9E"]} title={this.props.localAuthLabel}  />
                        <CMDLink className="cmd-life-satisfaction"
                          localAuth={this.props.localAuth}
                          dataset="wellbeing-local-authority"
                          body={bodyLifeSatisfaction}
                          icon="dark"
                           />
                         <button className="btn btn--primary save" onClick={(e) => {this.handleDownload(e)}} value={this.props.localAuth + '-lifeSatisfaction'}>Save this chart</button>
                      </div>
                      <div className="col-10">
                        <p>The groupings used are defined as:
                          <ul>
                            <li className= "margin-top--0 margin-bottom--0">Very good - a rating of 0-1 for anxiety and 9-10 for happiness, life satisfaction and worthwhile. </li>
                            <li className= "margin-top--0 margin-bottom--0">Good - a rating of 2-3 for anxiety and 7-8 for happiness, life satisfaction and worthwhile. </li>
                            <li className= "margin-top--0 margin-bottom--0">Fair - a rating of 4-5 for anxiety and 5-6 for happiness, life satisfaction and worthwhile. </li>
                            <li className= "margin-top--0 margin-bottom--0">Poor - a rating of 6-10 for anxiety and 0-4 for happiness, life satisfaction and worthwhile.</li> 
                          </ul>
                        </p>
                    </div>
                    </div>
                    :
                    <div className="row justify-content-md-center">
                      <div className="col-10">
                        <p>The service is unavailable, please check our <a href="https://twitter.com/onsdigital">twitter</a> feed for updates.</p>
                        <p>If you still encounter problems please <a href="mailto: web.comments@ons.gov.uk">contact us</a>. We apologise for any inconvenience this may have caused.</p>
                     </div>
                   </div>
                   
                  }

                </div>
               :
               null
             }
              </div>
          }
      </div>
    )
  }
}

export default WellBeingData
