import React, {Component} from 'react';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryGroup, VictoryTooltip, VictoryAxis } from 'victory';

class EarningsChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lower: 0,
      upper: 0,
      from: 0,
      to: 0
    }
  }

  setDomain(array) {
    let that = this
    let earnings = []
    let date = []
    array.forEach(function(time) {
      earnings.push(time.y)
      date.push(time.x)
    })
    if (earnings.length === array.length) {
      that.setState({
          lower: that.getLowest(earnings),
          upper: that.getHighest(earnings),
          from: that.getLowest(date),
          to: that.getHighest(date)
      })
    }
  }

  getLowest(array){
    return Math.min.apply( Math, array );
  };

  getHighest(array) {
    return Math.max.apply(Math, array);
  }

  componentDidMount() {
    this.setDomain([...this.props.dataFull, ...this.props.dataMale, ...this.props.dataFemale])
  }

  render() {
    return (
      <VictoryChart domain={{y: [this.state.lower - 2000, this.state.upper + 2000], x: [this.state.from, this.state.to]}} domainPadding={{x: [20, 10]}} >
        <VictoryGroup
          data={this.props.dataFull}
          labels={(data) => `£${data.y}`}
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
        <VictoryGroup
          data={this.props.dataMale}
          labels={(data) => `£${data.y}`}
          labelComponent={
              <VictoryTooltip
                style={{ fontSize: 10 }}
              />
            }
          >
          <VictoryLine
            style={{
                  data: { stroke: "tomato" }
                }}
            />
          <VictoryScatter size={5} style={{ data: { fill: "tomato" } }}/>
        </VictoryGroup>
        <VictoryGroup
          data={this.props.dataFemale}
          labels={(d) => `£${d.y}`}
          labelComponent={
              <VictoryTooltip
                style={{ fontSize: 10 }}
              />
            }
          >
          <VictoryLine
            style={{
                  data: { stroke: "orange" }
                }}
            />
          <VictoryScatter size={5} style={{ data: { fill: "orange" } }}/>
        </VictoryGroup>
        <VictoryAxis
          dependentAxis
          style={{
            ticks: {stroke: "black", size: 5},
            grid: {stroke: "grey"},
          }}
          />
        <VictoryAxis
          tickFormat={(data) => `${data.toString()}`}
          style={{
            ticks: {stroke: "black", size: 5}
          }}
          />
     </VictoryChart>
    );
  }
}

export default EarningsChart;
