import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryGroup, VictoryTooltip, VictoryAxis, VictoryLegend, VictoryLabel } from 'victory';

class CompareGenderPayGapChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paygapData: {},
      lower: 0,
      upper: 0,
      from: 0,
      to: 0,
      colors: ["rgb(15, 130, 67)","rgb(255, 178, 76)","rgb(211, 47, 47)","purple"],
      legend: {},
    }
  }

  componentDidMount() {
    let that = this
    let laData = {}

    for (var i in that.props.data) {
      laData[i] = {all: [], fullTime: [], partTime: []}
      for(var j in that.props.data[i]) {
        that.props.data[i][j]['female'].forEach(function(f) {
          that.props.data[i][j]['male'].forEach(function(m) {
            if(f.x === m.x) {
              if(f.y === 0 || m.y === 0) {
                return null
              } else {
                laData[i][j].push({x: f.x, y: ((m.y - f.y) / m.y) * 100})
              }
            }
          })
        })
      }
    }
    this.setState({
      paygapData: laData
    })
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
      <VictoryChart
        domain={{x: [2012, 2017]}}
        domainPadding={{y: [20,20],x: [20, 10]}}
      >
        {Object.keys(this.state.paygapData).map((item, key) =>
          <VictoryGroup
            key={key}
            labels={(data) => `${data.y.toFixed(2)}%`}
            labelComponent={
              <VictoryTooltip
                style={{ fontSize: 10 }}
              />
            }
            data={this.state.paygapData[item]['all']}
          >
            {this.props.showAll ?
              <VictoryLine
                style={{
                    data: { stroke: `${this.assignColor(key)}` }
                  }}
                /> : null}
            {this.props.showAll ?
              <VictoryScatter size={5} style={{ data: { fill: `${this.assignColor(key)}` } }}/> : null}
          </VictoryGroup>
        )}
        {Object.keys(this.state.paygapData).map((item, key) =>
          <VictoryGroup
            key={key}
            labels={(data) => `${data.y.toFixed(2)}%`}
            labelComponent={
              <VictoryTooltip
                style={{ fontSize: 10 }}
              />
            }
            data={this.state.paygapData[item]['fullTime']}
          >
            {this.props.showFT ?
              <VictoryLine
                style={{
                    data: { stroke: `${this.assignColor(key)}` }
                  }}
                /> : null}
            {this.props.showFT ?
            <VictoryScatter size={5} style={{ data: { fill: `${this.assignColor(key)}` } }}/> : null}
          </VictoryGroup>
        )}
        {Object.keys(this.state.paygapData).map((item, key) =>
          <VictoryGroup
            key={key}
            labels={(data) => `${data.y.toFixed(2)}%`}
            labelComponent={
              <VictoryTooltip
                style={{ fontSize: 10 }}
              />
            }
            data={this.state.paygapData[item]['partTime']}
          >
            {this.props.showPT ?
              <VictoryLine
                style={{
                    data: { stroke: `${this.assignColor(key)}` }
                  }}
                /> : null}
            {this.props.showPT ?
            <VictoryScatter size={5} style={{ data: { fill: `${this.assignColor(key)}` } }}/> : null}
          </VictoryGroup>
        )}
        <VictoryAxis
          dependentAxis tickFormat={(t) => `${t}%`}
          style={{
            ticks: {stroke: "black", size: 5},
            grid: {stroke: "grey"},
            tickLabels: {fontSize: 12}
          }}
          />
        <VictoryAxis
          tickFormat={(d) => `${d.toString()}`}
          style={{
            ticks: {stroke: "black", size: 5},
            tickLabels: {fontSize: 12}
          }}
          tickLabelComponent={<VictoryLabel y={270}/>}
          />
          <VictoryLegend x={0} y={0}
            orientation="horizontal"
            gutter={20}
            style={{ labels: {fontSize: 10 } }}
            data={this.setLegend()}
          />
      </VictoryChart>
    )
  }
}

export default CompareGenderPayGapChart
