import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryGroup, VictoryTooltip, VictoryLegend } from 'victory';

class CompareWellBeingChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: ["rgb(15, 130, 67)","rgb(255, 178, 76)","rgb(211, 47, 47)","purple"],
      legend: {},
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
    Object.keys(this.props.data).map((item, key) =>
      this.props.data[item][this.props.title].sort((a,b) => a.z - b.z)
    )
    return(
      <VictoryChart>
        {Object.keys(this.props.data).map((item, key) =>
          <VictoryBar
            data={[{x: "Poor", y: 60}, {x: "Fair", y: 60}, {x: "Good", y: 60}, {x: "Very good", y: 60},]}
            style={{
              data: {
                width: 80,
                fill: "#eee",
                fillOpacity: 0.6
              }
            }}
          />
        )}
        <VictoryGroup
          offset={20}
          colorScale={this.state.colors}
          >
          {Object.keys(this.props.data).map((item, key) =>
            <VictoryBar
              data={this.props.data[item][this.props.title]}
              labels={(data) => `${data.y}%`}
              labelComponent={
                <VictoryTooltip
                  style={{ fontSize: 10 }}
                />}
            />
          )}
        </VictoryGroup>

        <VictoryAxis
          dependentAxis
          style={{
            grid: {stroke: "grey"},
            axis: {stroke: "transparent"},
            tickLabels: {fontSize: 0}
          }}
        />
        <VictoryAxis
        />
        <VictoryLegend x={0} y={0}
          orientation="horizontal"
          gutter={20}
          style={{ title: {fontSize: 10 } }}
          data={this.setLegend()}
        />
      </VictoryChart>
    )
  }
}

export default CompareWellBeingChart
