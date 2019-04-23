import React, {Component} from 'react';
import PopulationHeatmap from './Heatmaps/PopulationHeatmap';
import WellbeingHeatmap from './Heatmaps/WellbeingHeatmap';
import EarningsHeatmap from './Heatmaps/EarningsHeatmap';

class HeatmapsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      population: "0",
      wellbeing: "anxiety",
      earningsFT: "all",
      earningsPT: "all"
    }
  }

  handlePopulation(e) {
    this.setState({
      population: e.target.value
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
    this.handlePopulation = this.handlePopulation.bind(this)
    this.handleShowWellbeing = this.handleShowWellbeing.bind(this)
    this.handleEarningsFT = this.handleEarningsFT.bind(this)
    this.handleEarningsPT = this.handleEarningsPT.bind(this)
    return (
      <div className="container">
        <h1 className="margin-bottom--0">UK highlights</h1>
        {this.props.loaded ?
          <div className="row justify-content-md-center">
            <div className="col-6">
              <div className="choropleth">
                <h2>Population</h2>
                  <form>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="populationAllRadio" value="0" checked={this.state.population === "0"} onChange={(e) => {this.handlePopulation(e)}}/>
                      <label className="form-check-label" htmlFor="populationMaleRadio">All</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="populationFemaleRadio" value="2" checked={this.state.population === "2"} onChange={(e) => {this.handlePopulation(e)}} />
                      <label className="form-check-label" htmlFor="populationFemaleRadio">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="populationMaleRadio" value="1" checked={this.state.population === "1"} onChange={(e) => {this.handlePopulation(e)}}/>
                      <label className="form-check-label" htmlFor="populationMaleRadio">Male</label>
                    </div>
                  </form>
                {this.state.population === "0" ? <PopulationHeatmap data={this.props.places} gender={this.state.population} /> : null }
                {this.state.population === "1" ? <PopulationHeatmap data={this.props.places} gender={this.state.population} /> : null }
                {this.state.population === "2" ? <PopulationHeatmap data={this.props.places} gender={this.state.population} /> : null }
              </div>
            </div>
            <div className="col-6">
              <div className="choropleth">
                <h2>Well-being</h2>
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
                <h2>Average Full-Time Earnings</h2>
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
                <h2>Average Part-Time Earnings</h2>
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
