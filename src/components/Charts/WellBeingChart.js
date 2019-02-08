import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryGroup, VictoryTooltip } from 'victory';

class WellBeingChart extends Component {

  render() {
    const local = this.props.local.sort((a,b) => a.z - b.z)
    const uk = this.props.uk.sort((a,b) => a.z - b.z)
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
      </VictoryChart>
    )
  }
}

export default WellBeingChart
