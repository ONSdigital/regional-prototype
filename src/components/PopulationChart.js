import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

class PopulationChart extends Component {
  render() {
    const data=[
    { x: 1, y: -10, y0: 10 },
    { x: 2, y: 3, y0: 2 },
    { x: 3, y: 5, y0: 2 },
    { x: 4, y: 4, y0: 3 },
    { x: 5, y: 6, y0: 3 }
  ];
    return (
      <VictoryChart domainPadding={20}>
        <svg>
          <VictoryAxis crossAxis
            width={400}
            height={400}
            domain={[-10, 10]}
            offsetY={200}
            standalone={false}
            tickLabels={"display= none"}
          />
          <VictoryAxis dependentAxis crossAxis
            width={400}
            height={400}
            domain={[-10, 10]}
            offsetX={200}
            standalone={false}
          />
        </svg>

      </VictoryChart>

    )
  }
}

export default PopulationChart;
