import React, {Component} from 'react';
import EarningsData from './Data/EarningsData';
import PartTimeEarningsData from './Data/PartTimeEarningsData';

class ChartTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      earnings: true,
      unemployment: false,
      wellfare: false
    }
  }

  handleEarningsClick(e) {
    this.setState({
      earnings: true,
      unemployment: false,
      wellfare: false
    })
    this.updateClass(e)
  }

  handleUnemploymentClick(e) {
    this.setState({
      earnings: false,
      unemployment: true,
      wellfare: false
    })
    this.updateClass(e)
  }

  handleWellfareClick(e) {
    this.setState({
      earnings: false,
      unemployment: false,
      wellfare: true
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
    this.handleUnemploymentClick = this.handleUnemploymentClick.bind(this)
    this.handleWellfareClick = this.handleWellfareClick.bind(this)
    return (
      <div className="chart-tab wrapper">
        <div className="background--ship-grey padding-top-md--1">
            <nav className="tabs--js">
                <ul className="list--neutral flush">
                    <li className="tab__item width-sm--6">
                        <span className="tab__link tab__link--active" onClick={(e) => {this.handleEarningsClick(e)}}>Earnings</span>
                    </li>
                    <li className="tab__item width-sm--6">
                        <span className="tab__link tab__link" onClick={(e) => {this.handleUnemploymentClick(e)}}>Unemployment</span>
                    </li>
                    <li className="tab__item width-sm--6">
                        <span className="tab__link tab__link" onClick={(e) => {this.handleWellfareClick(e)}}>Wellfare</span>
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
        </div>

      </div>
    )
  }
}

export default ChartTab
