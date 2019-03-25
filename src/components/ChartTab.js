import React, {Component} from 'react';
import PopulationData from './Data/PopulationData';
import EarningsData from './Data/EarningsData';
import PartTimeEarningsData from './Data/PartTimeEarningsData';
import WellBeingData from './Data/WellBeingData';
import GenderPayGapData from './Data/GenderPayGapData';

class ChartTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      demographics: true,
      earnings: false,
      genderPayGap: false,
      wellbeing: false
    }
  }

  handleDemographicsClick(e) {
    this.setState({
      earnings: false,
      genderPayGap: false,
      wellbeing: false,
      demographics: true,
    })
    this.updateClass(e)
  }

  handleEarningsClick(e) {
    this.setState({
      earnings: true,
      genderPayGap: false,
      wellbeing: false,
      demographics: false
    })
    this.updateClass(e)
  }

  handleGenderPayGapClick(e) {
    this.setState({
      earnings: false,
      genderPayGap: true,
      wellbeing: false,
      demographics: false
    })
    this.updateClass(e)
  }

  handleWellBeingClick(e) {
    this.setState({
      earnings: false,
      genderPayGap: false,
      wellbeing: true,
      demographics: false
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
      <div className="container-fluid chart-tab">
        <div className="row justify-content-md-center">
          <div className="col-10">
            <div className="tab padding-top-md--1">
                <nav className="tabs--js">
                    <ul className="list--neutral flush">
                      <li className="tab__item width-sm--6">
                          <span className="tab__link tab__link--active" onClick={(e) => {this.handleDemographicsClick(e)}}>Demographics</span>
                      </li>
                        <li className="tab__item width-sm--6">
                            <span className="tab__link tab__link" onClick={(e) => {this.handleEarningsClick(e)}}>Earnings</span>
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
          </div>
        </div>
        <PopulationData localAuth={this.props.localAuth}  localAuthLabel={this.props.localAuthLabel} show={this.state.demographics}/>
        <div className="row justify-content-md-center">
          <EarningsData localAuthLabel={this.props.localAuthLabel} localAuth={this.props.localAuth} show={this.state.earnings} />
          <PartTimeEarningsData localAuthLabel={this.props.localAuthLabel} localAuth={this.props.localAuth} show={this.state.earnings} />
            {this.state.earnings ? <div className="col-10">
              <p>The &#177; value represents the coefficient of variation (CV) and shows the extent of variability expressed as a percentage.</p>
              <p>*Estimates with a Coefficient of variation greater than 20% are suppressed from publication on quality grounds, along with those for which there is a risk of disclosure of individual employees or employers.</p>
            </div> : null}
        </div>
          <WellBeingData localAuthLabel={this.props.localAuthLabel}  localAuth={this.props.localAuth} show={this.state.wellbeing} />
          <GenderPayGapData localAuthLabel={this.props.localAuthLabel} localAuth={[{label: this.props.localAuthLabel, id: this.props.localAuth}, {label: 'UK', id: 'K02000001'}]} show={this.state.genderPayGap}/>
      </div>
    )
  }
}

export default ChartTab
