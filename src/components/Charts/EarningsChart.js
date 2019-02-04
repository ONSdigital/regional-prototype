import React, {Component} from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel, VictoryScatter, VictoryGroup, VictoryTooltip } from 'victory';

class EarningsChart extends Component {
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
    this.setDomain([...this.props.dataFull, ...this.props.dataMale, ...this.props.dataFemale])

  }

  render() {
    return (
      <VictoryChart domain={{y: [this.state.lower - 2000, this.state.upper + 2000]}}>
        <VictoryGroup
          data={this.props.dataFull}
          labels={(d) => `£${d.y}`}
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
          <VictoryScatter />
        </VictoryGroup>
        <VictoryGroup
          data={this.props.dataMale}
          labels={(d) => `£${d.y}`}
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
          <VictoryScatter />
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
          <VictoryScatter />
        </VictoryGroup>


     </VictoryChart>
    );
  }
}

export default EarningsChart;
