import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryLabel, VictoryStack} from 'victory';

class PopulationChart extends Component {

  render() {

    const dataA = [
      { x: "0-10", y: (this.props.malePop.m1 / this.props.totalPop * 100).toFixed(2) },
      { x: "11-20", y: (this.props.malePop.m2 / this.props.totalPop * 100).toFixed(2) },
      { x: "21-30", y: (this.props.malePop.m3 / this.props.totalPop * 100).toFixed(2) },
      { x: "31-40", y: (this.props.malePop.m4 / this.props.totalPop * 100).toFixed(2) },
      { x: "41-50", y: (this.props.malePop.m5 / this.props.totalPop * 100).toFixed(2) },
      { x: "51-60", y: (this.props.malePop.m6 / this.props.totalPop * 100).toFixed(2) },
      { x: "61-70", y: (this.props.malePop.m7 / this.props.totalPop * 100).toFixed(2) },
      { x: "70+", y: (this.props.malePop.m8 / this.props.totalPop * 100).toFixed(2) }
    ];

    const dataB = [
      { x: "0-10", y: (this.props.femalePop.f1 / this.props.totalPop * 100).toFixed(2) },
      { x: "11-20", y: (this.props.femalePop.f2 / this.props.totalPop * 100).toFixed(2) },
      { x: "21-30", y: (this.props.femalePop.f3 / this.props.totalPop * 100).toFixed(2) },
      { x: "31-40", y: (this.props.femalePop.f4 / this.props.totalPop * 100).toFixed(2) },
      { x: "41-50", y: (this.props.femalePop.f5 / this.props.totalPop * 100).toFixed(2) },
      { x: "51-60", y: (this.props.femalePop.f6 / this.props.totalPop * 100).toFixed(2) },
      { x: "61-70", y: (this.props.femalePop.f7 / this.props.totalPop * 100).toFixed(2) },
      { x: "70+", y: (this.props.femalePop.f8 / this.props.totalPop * 100).toFixed(2) }
    ];


    const width = 300;
    const height = 400;
    const padding = { top: 80, bottom: 80, left: 20, right: 20 };

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
          style={{ data: { width: 20 }, labels: { fontSize: 11 } }}
        >
          <VictoryBar
            style={{ data: { fill: "tomato" } }}
            data={dataA}
            y={(data) => (-Math.abs(data.y))}
            labels={(data) => (`${Math.abs(data.y)}%`)}
          />
          <VictoryBar
            style={{ data: { fill: "orange" } }}
            data={dataB}
            labels={(data) => (`${Math.abs(data.y)}%`)}
            y={(data) => (Math.abs(data.y))}
          />
        </VictoryStack>

        <VictoryAxis dependentAxis
          height={height}
          width={width}
          padding={padding}
          style={{
            axis: { stroke: "black" },
            ticks: { stroke: "black" },
            tickLabels: { fontSize: 11, fill: "black" }
          }}
          tickLabelComponent={<VictoryLabel x={250} textAnchor="middle"/>}
          tickValues={dataA.map((point) => point.x).reverse()}
        />
      </svg>
    );
  }
}

export default PopulationChart;
