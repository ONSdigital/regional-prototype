import React, {Component} from 'react';
import LifeExpectancyHeatmap from './Heatmaps/LifeExpectancyHeatmap';
import WellbeingHeatmap from './Heatmaps/WellbeingHeatmap';

class HeatmapsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gender: "females",
      wellbeing: "anxiety"
    }
  }

  handleShowMale() {
    this.setState({
      gender: "males"
    })
  }

  handleShowFemale() {
    this.setState({
      gender: "females"
    })
  }

  handleShowWellbeing(e) {
    this.setState({
      wellbeing: e.target.value
    })
  }

  render() {
    this.handleShowMale = this.handleShowMale.bind(this)
    this.handleShowFemale = this.handleShowFemale.bind(this)
    this.handleShowWellbeing = this.handleShowWellbeing.bind(this)
    return (
      <div className="container">
        {this.props.loaded ?
          <div className="row justify-content-md-center">
            <div className="col-6">
              <h3>Life Expectancy</h3>
                <form>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" checked={this.state.gender === "females"} onChange={this.handleShowFemale} />
                    <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked={this.state.gender === "males"} onChange={this.handleShowMale}/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                  </div>
                </form>
              {this.state.gender === "males" ? <LifeExpectancyHeatmap data={this.props.places} gender={this.state.gender} /> : null }
              {this.state.gender === "females" ? <LifeExpectancyHeatmap data={this.props.places} gender={this.state.gender} /> : null }
            </div>
            <div className="col-6">
              <h3>Wellbeing</h3>
              <form>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="anxiety" checked={this.state.wellbeing === "anxiety"} onChange={(e) => {this.handleShowWellbeing(e)}}/>
                  <label className="form-check-label" htmlFor="inlineRadio1">Anxiety</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="happiness" checked={this.state.wellbeing === "happiness"} onChange={this.handleShowWellbeing} />
                  <label className="form-check-label" htmlFor="inlineRadio2">Happiness</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="life-satisfaction" checked={this.state.wellbeing === "life-satisfaction"} onChange={this.handleShowWellbeing} />
                  <label className="form-check-label" htmlFor="inlineRadio3">Life Satisfaction</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="worthwhile" checked={this.state.wellbeing === "worthwhile"} onChange={this.handleShowWellbeing} />
                  <label className="form-check-label" htmlFor="inlineRadio4">Worthwhile</label>
                </div>
              </form>
              {this.state.wellbeing === "anxiety" ? <WellbeingHeatmap data={this.props.places} measure="anxiety"/> : null}
              {this.state.wellbeing === "happiness" ? <WellbeingHeatmap data={this.props.places} measure="happiness"/> : null}
              {this.state.wellbeing === "life-satisfaction" ? <WellbeingHeatmap data={this.props.places} measure="life-satisfaction"/> : null}
              {this.state.wellbeing === "worthwhile" ? <WellbeingHeatmap data={this.props.places} measure="worthwhile"/> : null}
            </div>
            <div className="col-5">
              <h3>Average Full-time earnings</h3>
            </div>
            <div className="col-5">
              <h3>Average Part-time earnings</h3>
            </div>
          </div>
           : null}
      </div>
    )
  }
}

export default HeatmapsContainer;
