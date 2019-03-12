import React, { Component } from 'react';
import { VictoryContainer, VictoryGroup, VictoryTooltip, VictoryScatter, VictoryLabel, VictoryChart, VictoryLine, VictoryAxis } from 'victory';

class PopulationGraph extends Component {
  render() {
    return (
      <VictoryChart domainPadding={{y: [20,20], x: [20, 20]}} >
        <VictoryGroup
          data={this.props.data}
          labels={(data) => `${data.y.toLocaleString('en')}`}
          labelComponent={
              <VictoryTooltip
                style={{ fontSize: 10 }}
              />
            }
          >
          <VictoryLine
            style={{
                  data: { stroke: "#3B7A9E" }
                }}

          />
        <VictoryScatter size={5} style={{ data: { fill: "#3B7A9E" } }}/>
        </VictoryGroup>
        <VictoryAxis
          dependentAxis
          style={{
            ticks: {stroke: "black", size: 5},
            grid: {stroke: "grey"},
            tickLabels: {fontSize: 12}
          }}
          tickCount={8}
          />
        <VictoryAxis
          tickFormat={(data) => `${data.toString()}`}
          style={{
            ticks: {stroke: "black", size: 5},
            tickLabels: {fontSize: 12}
          }}
          tickCount={6}
          />
     </VictoryChart>
  );
  }
}

export default PopulationGraph
