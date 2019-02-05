import React, { Component } from 'react';
import { VictoryBar, VictoryAxis, VictoryLabel, VictoryStack } from 'victory';

class PopulationChart extends Component {
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
    console.log(this.props)
    const width = 150;
    const height = this.props.fData.length * 1.25;
    const padding = { top: 5, bottom: 5, left: 0, right: 0 };

    return (
      <svg viewBox={`0 0 ${width} ${height}`}
        style={{ width: "100%", height: "auto" }}
      >
        <VictoryStack horizontal
          standalone={false}
          domain={{ x: [-this.state.upper, this.state.upper] }}
          padding={padding}
          height={height}
          width={width}
          style={{ data: { width: 0.75 }, labels: { fontSize: 11, fill:"#fff" } }}

        >
          <VictoryBar

            style={{ data: { fill: "tomato" } }}
            data={this.props.mData}
            labels={''}
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
                        return { text: (data) => data.x === '90' ? (`90+: ${data.z}`) : (`${data.x}: ${data.z}`)  }
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
            style={{ data: { fill: "orange" } }}
            data={this.props.fData}
            labels={''}
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
                        return { text: (data) => data.x === '90' ? (`90+: ${data.z}`) : (`${data.x}: ${data.z}`) }
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
            tickLabelComponent={<VictoryLabel x={75} textAnchor="middle"   />}
          />

        </VictoryStack>


      </svg>
    );
  }
}

export default PopulationChart;
