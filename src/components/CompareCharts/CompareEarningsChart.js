import React, {Component} from 'react';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryGroup, VictoryTooltip, VictoryAxis, VictoryLegend, VictoryLabel } from 'victory';

class CompareEarningsChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: ["rgb(15, 130, 67)","rgb(255, 178, 76)","rgb(211, 47, 47)","purple"],
      legend: {},
    }
  }

  componentDidMount() {
    if(this.props.fullTime) {
      if(this.props.showAll) {
        document.getElementById('earningsFTComparisonAll').children[0].children[0].id = 'compareFTEarningsAll'
      }
      if(this.props.showMale) {
        document.getElementById('earningsFTComparisonMale').children[0].children[0].id = 'compareFTEarningsMale'
      }
      if(this.props.showFemale) {
        document.getElementById('earningsFTComparisonFemale').children[0].children[0].id = 'compareFTEarningsFemale'
      }
    }
    if(this.props.partTime) {
      if(this.props.showAll) {
        document.getElementById('earningsPTComparisonAll').children[0].children[0].id = 'comparePTEarningsAll'
      }
      if(this.props.showMale) {
        document.getElementById('earningsPTComparisonMale').children[0].children[0].id = 'comparePTEarningsMale'
      }
      if(this.props.showFemale) {
        document.getElementById('earningsPTComparisonFemale').children[0].children[0].id = 'comparePTEarningsFemale'
      }
    }
  }

  componentDidUpdate() {
    if(this.props.fullTime) {
      if(this.props.showAll) {
        document.getElementById('earningsFTComparisonAll').children[0].children[0].id = 'compareFTEarningsAll'
      }
      if(this.props.showMale) {
        document.getElementById('earningsFTComparisonMale').children[0].children[0].id = 'compareFTEarningsMale'
      }
      if(this.props.showFemale) {
        document.getElementById('earningsFTComparisonFemale').children[0].children[0].id = 'compareFTEarningsFemale'
      }
    }
    if(this.props.partTime) {
      if(this.props.showAll) {
        document.getElementById('earningsPTComparisonAll').children[0].children[0].id = 'comparePTEarningsAll'
      }
      if(this.props.showMale) {
        document.getElementById('earningsPTComparisonMale').children[0].children[0].id = 'comparePTEarningsMale'
      }
      if(this.props.showFemale) {
        document.getElementById('earningsPTComparisonFemale').children[0].children[0].id = 'comparePTEarningsFemale'
      }
    }
  }


  assignColor(index) {
    return this.state.colors[index]
  }

  setLegend() {
    let legend = []
    this.props.localAuth.map((item, key) =>
      legend.push({name: item.label, symbol: { fill: this.assignColor(key) }})
    )
    return legend
  }

  render() {
    return (
      <VictoryChart domain={{x: [2012, 2017]}} domainPadding={{x: [20, 20], y: [30, 30]}}>
        {Object.keys(this.props.data).map((item, key) =>
          <VictoryGroup
            key={key}
            data={this.props.data[item]['all']}
            labels={(data) => `£${data.y.toLocaleString('en')}` + ` (\u00B1${data.cv})`}
            labelComponent={
                <VictoryTooltip
                  style={{ fontSize: 10 }}
                />
              }
            >
            {this.props.showAll ?
                <VictoryLine
                style={{
                      data: { stroke: `${this.assignColor(key)}` }
                    }}
                    />
            : null}
            {this.props.showAll ?
                <VictoryScatter size={5} style={{ data: { fill: `${this.assignColor(key)}`} }}/>
            : null}



          </VictoryGroup>
        )}
        {Object.keys(this.props.data).map((item, key) =>
          <VictoryGroup
            key={key}
            data={this.props.data[item]['male']}
            labels={(data) => `£${data.y.toLocaleString('en')}` + ` (\u00B1${data.cv})`}
            labelComponent={
                <VictoryTooltip
                  style={{ fontSize: 10 }}
                />
              }
            >
            {this.props.showMale ?
              <VictoryLine
              style={{
                    data: { stroke: `${this.assignColor(key)}` }
                  }}
                  />
            : null }
            {this.props.showMale ?
              <VictoryScatter size={5} style={{ data: { fill: `${this.assignColor(key)}` } }}/>
            : null }
          </VictoryGroup>
        )}
        {Object.keys(this.props.data).map((item, key) =>
          <VictoryGroup
            key={key}
            data={this.props.data[item]['female']}
            labels={(data) => `£${data.y.toLocaleString('en')}` + ` (\u00B1${data.cv})`}
            labelComponent={
                <VictoryTooltip
                  style={{ fontSize: 10 }}
                />
              }
            >
            {this.props.showFemale ?
              <VictoryLine
                style={{
                      data: { stroke: `${this.assignColor(key)}` }
                    }}
              />
            : null}
            {this.props.showFemale ?
              <VictoryScatter size={5} style={{ data: { fill: `${this.assignColor(key)}` } }}/>
            : null}

          </VictoryGroup>
        )}
        <VictoryAxis
          dependentAxis
          style={{
            ticks: {stroke: "black", size: 5},
            tickLabels: {fontSize: 12},
            grid: {stroke: "grey"},
          }}
          tickCount={8}
          />
        <VictoryAxis
          label="£"
          axisLabelComponent={<VictoryLabel y={30} x={50} angle={0}/>}
          tickFormat={(data) => `${data.toString()}`}
          style={{
            ticks: {stroke: "black", size: 5},
            tickLabels: {fontSize: 12}
          }}
          tickCount={6}

          />
        <VictoryLegend x={10} y={10}
          orientation="horizontal"
          gutter={20}
          style={{ labels: { fontSize: 10 }, }}
          data={this.setLegend()}

        />
     </VictoryChart>
    );
  }
}

export default CompareEarningsChart;
