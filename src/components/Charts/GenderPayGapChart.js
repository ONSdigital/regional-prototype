import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryGroup, VictoryTooltip, VictoryAxis } from 'victory';

class GenderPayGapChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lower: 0,
      upper: 0
    }
  }

  setDomain(array) {
    let that = this
    let earnings = []
    array.forEach(function(time) {
      earnings.push(time.y)
    })
    if (earnings.length === array.length) {
      that.setState({
          lower: that.getLowest(earnings),
          upper: that.getHighest(earnings)
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
    this.setDomain([...this.props.fullTime, ...this.props.partTime, ...this.props.all])
  }

  render() {
    return (
      <VictoryChart
        domain={{y: [this.state.lower - 2, this.state.upper + 2]}}
      >
        <VictoryGroup
          labels={(data) => `${data.y.toFixed(2)}%`}
          labelComponent={
            <VictoryTooltip
              style={{ fontSize: 10 }}
            />
          }
          data={this.props.fullTime}
        >
          <VictoryLine
            style={{
                data: { stroke: "tomato" }
              }}
            />
          <VictoryScatter size={5} style={{ data: { fill: "tomato" } }}/>
        </VictoryGroup>
        <VictoryGroup
          labels={(data) => `${data.y.toFixed(2)}%`}
          labelComponent={
              <VictoryTooltip
                style={{ fontSize: 10 }}
              />
            }
          data={this.props.partTime}
        >
          <VictoryLine
            style={{
                  data: { stroke: "orange" }
                }}
            />
          <VictoryScatter size={5} style={{ data: { fill: "orange" } }}/>
        </VictoryGroup>
        <VictoryGroup
          labels={(data) => `${data.y.toFixed(2)}%`}
          labelComponent={
              <VictoryTooltip
                style={{ fontSize: 10 }}
              />
            }
          data={this.props.all}
        >
          <VictoryLine
            style={{
                  data: { stroke: "#3B7A9E" }
                }}
            />
          <VictoryScatter size={5} style={{ data: { fill: "#3B7A9E" } }}/>
        </VictoryGroup>
        <VictoryAxis dependentAxis tickFormat={(t) => `${t}%`}/>
        <VictoryAxis />
      </VictoryChart>
    )
  }
}

export default GenderPayGapChart