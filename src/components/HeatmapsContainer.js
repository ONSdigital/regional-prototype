import React, {Component} from 'react';
import LifeExpectancyHeatmap from './Heatmaps/LifeExpectancyHeatmap';
import WellbeingHeatmap from './Heatmaps/WellbeingHeatmap';
import EarningsHeatmap from './Heatmaps/EarningsHeatmap';

class HeatmapsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lifeExpectancy: "females",
      wellbeing: "anxiety",
      earningsFT: "all",
      earningsPT: "all"
    }
  }

  handleLifeExpectancy(e) {
    this.setState({
      lifeExpectancy: e.target.value
    })
  }

  handleShowWellbeing(e) {
    this.setState({
      wellbeing: e.target.value
    })
  }

  handleEarningsFT(e) {
    this.setState({
      earningsFT: e.target.value
    })
  }

  handleEarningsPT(e) {
    this.setState({
      earningsPT: e.target.value
    })
  }

  render() {
    this.handleLifeExpectancy = this.handleLifeExpectancy.bind(this)
    this.handleShowWellbeing = this.handleShowWellbeing.bind(this)
    this.handleEarningsFT = this.handleEarningsFT.bind(this)
    this.handleEarningsPT = this.handleEarningsPT.bind(this)
    return (
      <div className="container">
        {this.props.loaded ?
          <div className="row justify-content-md-center">
            <div className="col-6">
              <div className="choropleth">
                <h2>Life Expectancy</h2>
                  <form>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="lifeExpectancyFemaleRadio" value="females" checked={this.state.lifeExpectancy === "females"} onChange={(e) => {this.handleLifeExpectancy(e)}} />
                      <label className="form-check-label" htmlFor="lifeExpectancyFemaleRadio">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="lifeExpectancyMaleRadio" value="males" checked={this.state.lifeExpectancy === "males"} onChange={(e) => {this.handleLifeExpectancy(e)}}/>
                      <label className="form-check-label" htmlFor="lifeExpectancyMaleRadio">Male</label>
                    </div>
                  </form>
                {this.state.lifeExpectancy === "males" ? <LifeExpectancyHeatmap data={this.props.places} gender={this.state.lifeExpectancy} /> : null }
                {this.state.lifeExpectancy === "females" ? <LifeExpectancyHeatmap data={this.props.places} gender={this.state.lifeExpectancy} /> : null }
              </div>
            </div>
            <div className="col-6">
              <div className="choropleth">
                <h2>Wellbeing</h2>
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
            </div>
            <div className="col-6">
              <div className="choropleth">
                <h2>Average Full-time earnings</h2>
                <form>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="all" checked={this.state.earningsFT === "all"} onChange={(e) => {this.handleEarningsFT(e)}}/>
                    <label className="form-check-label" htmlFor="inlineRadio1">All</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female" checked={this.state.earningsFT === "female"} onChange={(e) => {this.handleEarningsFT(e)}} />
                    <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male" checked={this.state.earningsFT === "male"} onChange={(e) => {this.handleEarningsFT(e)}}/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                  </div>
                </form>
                {this.state.earningsFT === "female" ? <EarningsHeatmap data={this.props.places} gender={this.state.earningsFT} pattern="full-time" table="7" /> : null}
                {this.state.earningsFT === "male" ? <EarningsHeatmap data={this.props.places} gender={this.state.earningsFT} pattern="full-time" table="7" /> : null}
                {this.state.earningsFT === "all" ? <EarningsHeatmap data={this.props.places} gender={this.state.earningsFT} pattern="full-time" table="7" /> : null}
              </div>
            </div>
            <div className="col-6">
              <div className="choropleth">
                <h2>Average Part-time earnings</h2>
                  <form>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="all" checked={this.state.earningsPT === "all"} onChange={(e) => {this.handleEarningsPT(e)}}/>
                      <label className="form-check-label" htmlFor="inlineRadio1">All</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female" checked={this.state.earningsPT === "female"} onChange={(e) => {this.handleEarningsPT(e)}} />
                      <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male" checked={this.state.earningsPT === "male"} onChange={(e) => {this.handleEarningsPT(e)}}/>
                      <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                    </div>
                  </form>
                  {this.state.earningsPT === "female" ? <EarningsHeatmap data={this.props.places} gender={this.state.earningsPT} pattern="part-time" table="7" /> : null}
                  {this.state.earningsPT === "male" ? <EarningsHeatmap data={this.props.places} gender={this.state.earningsPT} pattern="part-time" table="7" /> : null}
                  {this.state.earningsPT === "all" ? <EarningsHeatmap data={this.props.places} gender={this.state.earningsPT} pattern="part-time" table="7" /> : null}
              </div>
            </div>
          </div>
           : null}
      </div>
    )
  }
}

export default HeatmapsContainer;
