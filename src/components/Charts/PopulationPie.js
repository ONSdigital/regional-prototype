import React, { Component } from 'react';
import { VictoryLabel, VictoryTooltip, VictoryPie, VictoryLegend } from 'victory';

class PopulationPie extends Component {
  render() {
    return (
      <svg id={this.props.localAuth + '-populationPie'} viewBox="0 0 400 400" style={{ width: "100%", height: "auto", padding: "0 150px" }}>
        <VictoryPie
          standalone={false}
          style={{ data: {stroke: '#ffffff'}, labels: { fill: "black" } }}
          colorScale={["orange", "tomato"]}
          innerRadius={100}
          data={this.props.data}
          labelComponent={
            <VictoryLabel
              textAnchor="middle"
              style={{ fontSize: 30 }}
              x={200} y={200}
              text={(data) => data.x === "Female" ? `${data.x} \n ${data.y.toFixed(2)}%` : null}
            />
          }
        />

    </svg>
    );
  }
}

export default PopulationPie
