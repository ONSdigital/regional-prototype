import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryGroup, VictoryTooltip, VictoryLegend } from 'victory';

class WellBeingChart extends Component {

  render() {
    const local = this.props.local.sort((a,b) => a.z - b.z)
    const uk = this.props.uk.sort((a,b) => a.z - b.z)
    const legendColor = this.props.color[0]
    return(
      <VictoryChart>
        <VictoryGroup
          offset={25}
          style={{ data: { width: 20 } }}
          colorScale={this.props.color}
          >
          <VictoryBar
            data={local}
            labels={(data) => `${data.y}%`}
            labelComponent={
              <VictoryTooltip
                style={{ fontSize: 10 }}
              />}
          />
          <VictoryBar
            data={uk}
            labels={(data) => `${data.y}%`}
            labelComponent={
              <VictoryTooltip
                style={{ fontSize: 10 }}
              />}
          />
        </VictoryGroup>
        <VictoryAxis
          dependentAxis
          style={{
          grid: {stroke: "grey"},
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
