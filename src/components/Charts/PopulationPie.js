import React, { Component } from 'react';
import { VictoryLabel, VictoryTooltip, VictoryPie, VictoryLegend } from 'victory';

class PopulationPie extends Component {
  render() {
    return (
      <svg viewBox="0 0 400 400" style={{ width: "100%", height: "auto", padding: "0 150px" }}>
        <VictoryPie
          standalone={false}
          style={{ data: {stroke: '#ffffff'}, labels: { fill: "black" } }}
          colorScale={["orange", "tomato"]}
          innerRadius={100}
          data={this.props.data}
          labels={(data) => ""}
          labelComponent={
            <VictoryLabel
              textAnchor="middle"
              style={{ fontSize: 30 }}
              x={200} y={200}
            />
          }
          events={[
            {
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [{
                    target: "labels",
                    mutation: (props) => {
                      return { text: (data) => `${data.x} \n ${data.y.toFixed(2)}%` }
                    }
                  }];
                }
              }
            },
            {
              target: "data",
              eventHandlers: {
                onMouseLeave: () => {
                  return [{
                    target: "labels",
                    mutation: (props) => {
                      return { text: ""}
                    }
                  }];
                }
              }
            }
          ]}
        />

    </svg>
    );
  }
}

export default PopulationPie
