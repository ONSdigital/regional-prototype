import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryGroup, VictoryTooltip, VictoryAxis, VictoryLegend, VictoryLabel } from 'victory';

class GenderPayGapChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lower: 0,
      upper: 0,
      from: 0,
      to: 0
    }
  }

  setDomain(array) {
    let that = this
    let earnings = []
    let date = []
    array.forEach(function(time) {
      earnings.push(time.y)
      date.push(time.x)
    })
    let dateLength = new Set(date).size
    this.setState({
      length: dateLength
    })
    if (earnings.length === array.length) {
      that.setState({
          lower: that.getLowest(earnings),
          upper: that.getHighest(earnings),
          from: that.getLowest(date),
          to: that.getHighest(date)
      })
    }
  }

  getLowest(array){
    return Math.min.apply( Math, array );
  };

  getHighest(array) {
    return Math.max.apply(Math, array);
  }

  componentDidMount() {
    this.setDomain([...this.props.fullTime, ...this.props.partTime, ...this.props.all])
  }

  render() {
    return (
      <VictoryChart
        domain={{y: [this.state.lower - 2, this.state.upper + 2], x: [this.state.from, this.state.to]}}
        domainPadding={{x: [20, 10]}}
      >
        <VictoryGroup
          labels={(data) => `${data.y.toFixed(2)}%`}
          labelComponent={
            <VictoryTooltip
              style={{ fontSize: 10 }}
            />
          }
          data={this.props.fullTime}
        >
          <VictoryLine
            style={{
                data: { stroke: "tomato" }
              }}
            />
          <VictoryScatter size={5} style={{ data: { fill: "tomato" } }}/>
        </VictoryGroup>
        <VictoryGroup
          labels={(data) => `${data.y.toFixed(2)}%`}
          labelComponent={
              <VictoryTooltip
                style={{ fontSize: 10 }}
              />
            }
          data={this.props.partTime}
        >
          <VictoryLine
            style={{
                  data: { stroke: "orange" }
                }}
            />
          <VictoryScatter size={5} style={{ data: { fill: "orange" } }}/>
        </VictoryGroup>
        <VictoryGroup
          labels={(data) => `${data.y.toFixed(2)}%`}
          labelComponent={
              <VictoryTooltip
                style={{ fontSize: 10 }}
              />
            }
          data={this.props.all}
        >
          <VictoryLine
            style={{
                  data: { stroke: "#3B7A9E" }
                }}
            />
          <VictoryScatter size={5} style={{ data: { fill: "#3B7A9E" } }}/>
        </VictoryGroup>
        <VictoryAxis
          dependentAxis tickFormat={(t) => `${t}%`}
          style={{
            ticks: {stroke: "black", size: 5},
            grid: {stroke: "grey"},
          }}
          />
        <VictoryAxis
          tickFormat={(d) => `${d.toString()}`}
          style={{
            ticks: {stroke: "black", size: 5}
          }}
          tickLabelComponent={<VictoryLabel y={270}/>}
          />
          <VictoryLegend x={0} y={0}
            orientation="horizontal"
            gutter={20}
            style={{ title: {fontSize: 20 } }}
            data={[
              { name: "All", symbol: { fill: "#3B7A9E" } },
              { name: "Full-Time", symbol: { fill: "tomato" } },
              { name: "Part-Time", symbol: { fill: "orange" } }
            ]}
          />
      </VictoryChart>
    )
  }
}

export default GenderPayGapChart
