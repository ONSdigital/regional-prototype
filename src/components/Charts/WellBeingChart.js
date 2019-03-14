import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryGroup, VictoryLabel, VictoryLegend } from 'victory';

class WellBeingChart extends Component {
  componentDidMount() {
    document.getElementById('anxiety').children[1].children[0].id = `${this.props.localAuth}-anxiety`
    document.getElementById('happiness').children[1].children[0].id = `${this.props.localAuth}-happiness`
    document.getElementById('worthwhile').children[1].children[0].id = `${this.props.localAuth}-worthwhile`
    document.getElementById('lifeSatisfaction').children[1].children[0].id = `${this.props.localAuth}-lifeSatisfaction`
  }

  render() {
    const local = this.props.local.sort((a,b) => a.z - b.z)
    const uk = this.props.uk.sort((a,b) => a.z - b.z)
    const legendColor = this.props.color[0]
    return(
      <VictoryChart>
        <VictoryGroup
          offset={35}
          style={{ data: { width: 25 } }}
          colorScale={this.props.color}
          >
          <VictoryBar
            data={local}
            labels={(data) => data.y === 0 ? 'No data' : `${data.y}%`}
            labelComponent={
              <VictoryLabel
                style={{ fontSize: 10 }}
              />}
          />
          <VictoryBar
            data={uk}
            labels={(data) => data.y === 0 ? 'No data' : `${data.y}%`}
            labelComponent={
              <VictoryLabel
                style={{ fontSize: 10 }}
              />}
          />
        </VictoryGroup>
        <VictoryAxis
          dependentAxis
          style={{
          axis: {stroke: "transparent"},
          tickLabels: {fontSize: 0}
        }}/>
        <VictoryAxis />
        <VictoryLegend x={0} y={0}
          orientation="horizontal"
          gutter={20}
          style={{ title: {fontSize: 20 } }}
          data={[
            { name: this.props.title, symbol: { fill: legendColor } },
            { name: "UK", symbol: { fill: "#3B7A9E" } }
          ]}
        />
      </VictoryChart>
    )
  }
}

export default WellBeingChart
