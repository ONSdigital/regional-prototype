import React, {Component} from 'react';
import EarningsData from './Data/EarningsData';
import PartTimeEarningsData from './Data/PartTimeEarningsData';
import WellBeingData from './Data/WellBeingData';
import GenderPayGapData from './Data/GenderPayGapData';

class ChartTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      earnings: true,
      genderPayGap: false,
      wellbeing: false
    }
  }

  handleEarningsClick(e) {
    this.setState({
      earnings: true,
      genderPayGap: false,
      wellbeing: false
    })
    this.updateClass(e)
  }

  handleGenderPayGapClick(e) {
    this.setState({
      earnings: false,
      genderPayGap: true,
      wellbeing: false
    })
    this.updateClass(e)
  }

  handleWellBeingClick(e) {
    this.setState({
      earnings: false,
      genderPayGap: false,
      wellbeing: true
    })
    this.updateClass(e)
  }

  updateClass(e) {
    let tab = document.getElementsByClassName('tab__link')
    for (var i = 0; i < tab.length; i++) {
      tab[i].classList.remove('tab__link--active');
    }
    e.target.classList.add("tab__link--active")
  }



  render() {
    this.handleEarningsClick = this.handleEarningsClick.bind(this)
    this.handleGenderPayGapClick = this.handleGenderPayGapClick.bind(this)
    this.handleWellBeingClick = this.handleWellBeingClick.bind(this)
    return (
      <div className="chart-tab wrapper">
        <div className="background--ship-grey padding-top-md--1">
            <nav className="tabs--js">
                <ul className="list--neutral flush">
                    <li className="tab__item width-sm--6">
                        <span className="tab__link tab__link--active" onClick={(e) => {this.handleEarningsClick(e)}}>Earnings</span>
                    </li>
                    <li className="tab__item width-sm--6">
                        <span className="tab__link tab__link" onClick={(e) => {this.handleWellBeingClick(e)}}>Well-Being</span>
                    </li>
                    <li className="tab__item width-sm--6">
                        <span className="tab__link tab__link" onClick={(e) => {this.handleGenderPayGapClick(e)}}>Gender Pay Gap</span>
                    </li>
                </ul>
            </nav>
        </div>
        <div className="margin-left--2 margin-right--2 margin-bottom--2">
          {this.state.earnings ?
            <div className="col-wrap">
              <div className="col col--md-one col--lg-one">
                <h2>Annual Earnings for Full Time and Part Time Workers </h2>
              </div>
              <div className="col col--md-half col--lg-half">
                <h3>Full Time</h3>
                <EarningsData localAuth={this.props.localAuth} />
              </div>
              <div className="col col--md-half col--lg-half">
                <h3>Part Time</h3>
                <PartTimeEarningsData localAuth={this.props.localAuth} />
              </div>
            </div>
             : null}
          {this.state.wellbeing ?
            <div className="col-wrap">
              <div className="col col--md-one col--lg-one">
                <h2>Personal Well-being</h2>
              </div>
              <div className="col col--md-half col--lg-half">
              </div>
              <div>
                <WellBeingData localAuth={this.props.localAuth} />
              </div>
            </div> : null
          }
          {this.state.genderPayGap ?
            <div className="col-wrap">
              <div className="col col--md-half col--lg-half">
                <GenderPayGapData localAuth={this.props.localAuth} />
              </div>
            </div> : null
          }
        </div>

      </div>
    )
  }
}

export default ChartTab
