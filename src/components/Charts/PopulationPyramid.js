import React, { Component } from 'react';
import { VictoryBar, VictoryAxis, VictoryLabel, VictoryChart } from 'victory';

class PopulationPyramid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      upper: 0
    }
  }

  setDomain(array) {
    let that = this
    let data = []
    array.forEach(function(pop) {
      data.push(pop.y)
    })
    if (data.length === array.length) {
      that.setState({
          upper: that.getHighest(data)
      })
    }
  }

  getHighest(array) {
    return Math.max.apply(Math, array);
  }

  componentDidMount() {
    this.setDomain([...this.props.mData, ...this.props.fData])
  }

  render() {
    const width = 150;
    const height = this.props.fData.length * 1.75;
    const padding = { top: 5, bottom: 5, left: 0, right: 0 };
    const domain = { x: [-this.state.upper.toFixed(2), this.state.upper.toFixed(2)]}
    return (
      <svg id={this.props.localAuth + "-populationPyramid"} viewBox={`0 0 ${width} ${height + 20}`}
        style={{ width: "100%", height: "auto" }}
      >
        <VictoryChart
          horizontal
          standalone={false}
          domain={domain}
          padding={padding}
          height={height}
          width={width}
          domainPadding={{x: [5,5], y: [0, 5]}}
        >
          <VictoryBar
            style={{ data: { width: 1.25, fill: "tomato" }, labels: {fontSize: 5} }}
            data={this.props.mData}
            labels={(data) => ""}
            labelComponent={<VictoryLabel x={10} textAnchor="middle"/>}
            y={(data) => (-Math.abs(data.y))}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [{
                      target: "labels",
                      mutation: (props) => {
                        return { text: (data) => data.x === '90' ? (`90+: ${data.y.toFixed(2)}%`) : (`${data.x}: ${data.y.toFixed(2)}%`)  }
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
                        return { text:  ''}
                      }
                    }];
                  }
                }
              }
            ]}
          />
          <VictoryBar
            style={{ data: { width: 1.25, fill: "orange" }, labels: {fontSize: 5}}}
            data={this.props.fData}
            labels={(data) => ""}
            labelComponent={<VictoryLabel x={140} textAnchor="middle"/>}
            y={(data) => (Math.abs(data.y))}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [{
                      target: "labels",
                      mutation: (props) => {
                        return { text: (data) => data.x === '90' ? (`90+: ${data.y.toFixed(2)}%`) : (`${data.x}: ${data.y.toFixed(2)}%`) }
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
                        return { text:  ''}
                      }
                    }];
                  }
                }
              }
            ]}
          />
          <VictoryAxis
            dependentAxis
            label="Age"
            axisLabelComponent={<VictoryLabel x={75} y={5} textAnchor="middle" angle={0}/>}
            tickLabelComponent={<VictoryLabel x={75} textAnchor="middle" />}
            style={{axis: {stroke: "transparent"}, axisLabel: {fontSize: 4}, tickLabels: { fill: '#000000', fontSize: 2.5}}}
            tickCount={45}
            tickFormat={(t) => t === '90' ? '90+' : t}
          />
          <VictoryAxis
            tickLabelComponent={<VictoryLabel y={160} textAnchor="middle" />}
            axisLabelComponent={<VictoryLabel y={165}/>}
            style={{ axis: {stroke: "#000000"}, axisLabel: {fontSize: 4}, tickLabels: {fontSize: 4, padding: 20}, ticks: {stroke: "black", size: 2.5},}}
            offsetY={2.5}
            tickCount={6}
            tickFormat={(t) => `${(t).toString().replace(/-/g, "")}%`}
            label="Percentage of Population"
          />

      </VictoryChart>


      </svg>
    );
  }
}

export default PopulationPyramid;
