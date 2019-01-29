import React, {Component} from 'react';
import Employment from './Charts/Employment';

class ChartTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      charts: ['employment', 'unemployment', 'wellfare'],
      employment: true,
      unemployment: false,
      wellfare: false
    }
  }

  handleEmploymentClick(e) {
    this.setState({
      employment: true,
      unemployment: false,
      wellfare: false
    })
    this.updateClass(e)
  }

  handleUnemploymentClick(e) {
    this.setState({
      employment: false,
      unemployment: true,
      wellfare: false
    })
    this.updateClass(e)
  }

  handleWellfareClick(e) {
    this.setState({
      employment: false,
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
    this.handleEmploymentClick = this.handleEmploymentClick.bind(this)
    this.handleUnemploymentClick = this.handleUnemploymentClick.bind(this)
    this.handleWellfareClick = this.handleWellfareClick.bind(this)
    return (
      <div className="chart-tab wrapper">
        <div className="background--ship-grey padding-top-md--1">
            <nav className="tabs--js">
                <ul className="list--neutral flush">
                    <li className="tab__item width-sm--6">
                        <span className="tab__link tab__link--active" onClick={(e) => {this.handleEmploymentClick(e)}}>Employment</span>
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
        <div className="col-wrap">
          <div className="col col--md-half col--lg-half">
            <h3>Key Figures:</h3>
          </div>
          <div className="col col--md-half col--lg-half">
            {this.state.employment ? <Employment /> : null}
          </div>
        </div>

      </div>
    )
  }
}

export default ChartTab
