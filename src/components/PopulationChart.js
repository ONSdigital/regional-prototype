import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryLabel, VictoryStack, PropTypes } from 'victory';

class PopulationChart extends Component {

  render() {

    const dataA = [
      { x: "0-10", y: (this.props.malePop.m1 / this.props.totalPop * 100).toFixed(2), z: this.props.malePop.m1 },
      { x: "11-20", y: (this.props.malePop.m2 / this.props.totalPop * 100).toFixed(2), z: this.props.malePop.m2 },
      { x: "21-30", y: (this.props.malePop.m3 / this.props.totalPop * 100).toFixed(2), z: this.props.malePop.m3 },
      { x: "31-40", y: (this.props.malePop.m4 / this.props.totalPop * 100).toFixed(2), z: this.props.malePop.m4 },
      { x: "41-50", y: (this.props.malePop.m5 / this.props.totalPop * 100).toFixed(2), z: this.props.malePop.m5 },
      { x: "51-60", y: (this.props.malePop.m6 / this.props.totalPop * 100).toFixed(2), z: this.props.malePop.m6 },
      { x: "61-70", y: (this.props.malePop.m7 / this.props.totalPop * 100).toFixed(2), z: this.props.malePop.m7 },
      { x: "70+", y: (this.props.malePop.m8 / this.props.totalPop * 100).toFixed(2), z: this.props.malePop.m8 }
    ];

    const dataB = [
      { x: "0-10", y: (this.props.femalePop.f1 / this.props.totalPop * 100).toFixed(2), z: this.props.femalePop.f1 },
      { x: "11-20", y: (this.props.femalePop.f2 / this.props.totalPop * 100).toFixed(2), z: this.props.femalePop.f2  },
      { x: "21-30", y: (this.props.femalePop.f3 / this.props.totalPop * 100).toFixed(2), z: this.props.femalePop.f3 },
      { x: "31-40", y: (this.props.femalePop.f4 / this.props.totalPop * 100).toFixed(2), z: this.props.femalePop.f4 },
      { x: "41-50", y: (this.props.femalePop.f5 / this.props.totalPop * 100).toFixed(2), z: this.props.femalePop.f5 },
      { x: "51-60", y: (this.props.femalePop.f6 / this.props.totalPop * 100).toFixed(2), z: this.props.femalePop.f6 },
      { x: "61-70", y: (this.props.femalePop.f7 / this.props.totalPop * 100).toFixed(2), z: this.props.femalePop.f7 },
      { x: "70+", y: (this.props.femalePop.f8 / this.props.totalPop * 100).toFixed(2), z: this.props.femalePop.f8 }
    ];


    const width = 300;
    const height = 250;
    const padding = { top: 20, bottom: 20, left: 0, right: 0 };

    return (
      <svg viewBox={`0 0 ${width} ${height}`}
        style={{ width: "100%", height: "auto" }}
      >
        <VictoryStack horizontal
          standalone={false}
          domain={{ x: [-15, 15] }}
          padding={padding}
          height={height}
          width={width}
          style={{ data: { width: 20 }, labels: { fontSize: 11, fill:"#fff" } }}

        >
          <VictoryBar
            style={{ data: { fill: "tomato" } }}
            data={dataA}
            y={(data) => (-Math.abs(data.y))}
            labels={(data) => (`${Math.abs(data.y)}%`)}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [{
                      target: "labels",
                      mutation: (props) => {
                        return { text: (data) => (`${Math.abs(data.z)}`) }
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
                        return { text:  (data) => (`${Math.abs(data.y)}%`)}
                      }
                    }];
                  }
                }
              }
            ]}
          />
          <VictoryBar
            style={{ data: { fill: "orange" } }}
            data={dataB}
            labels={(data) => (`${Math.abs(data.y)}%`)}
            y={(data) => (Math.abs(data.y))}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [{
                      target: "labels",
                      mutation: (props) => {
                        return { text: (data) => (`${Math.abs(data.z)}`) }
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
                        return { text:  (data) => (`${Math.abs(data.y)}%`)}
                      }
                    }];
                  }
                }
              }
            ]}
          />
          <VictoryAxis
            dependentAxis
            tickLabelComponent={<VictoryLabel x={150} textAnchor="middle" style={{}}/>}
            tickValues={dataA.map((point) => point.x)}
          />

        </VictoryStack>


      </svg>
    );
  }
}

export default PopulationChart;
