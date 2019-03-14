import React, {Component} from 'react';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryGroup, VictoryTooltip, VictoryAxis, VictoryLegend, VictoryLabel } from 'victory';

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
    let dateLength = new Set(date).size
    this.setState({
      length: dateLength
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
    if(this.props.showPOR && this.props.fullTime) {
      document.getElementById('por-FT').children[0].children[0].id = `${this.props.localAuth}-por-FT`

    }
    if(this.props.showPOR && this.props.partTime) {
      document.getElementById('por-PT').children[0].children[0].id = `${this.props.localAuth}-por-PT`
    }
    if(this.props.showPOW && this.props.fullTime) {
      document.getElementById('pow-FT').children[0].children[0].id = `${this.props.localAuth}-pow-FT`
    }
    if(this.props.showPOW && this.props.partTime) {
      document.getElementById('pow-PT').children[0].children[0].id = `${this.props.localAuth}-pow-PT`
    }
  }

  render() {
    return (
        <VictoryChart domain={{ x: [2012, 2017]}} domainPadding={{y: [20,20], x: [20, 20]}} >
          <VictoryGroup
            data={this.props.dataFull}
            labels={(data) => `£${data.y.toLocaleString('en')}` + ` (\u00B1${data.cv})`}
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
            labels={(data) => `£${data.y.toLocaleString('en')}` + ` (\u00B1${data.cv})`}
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
            labels={(data) => `£${data.y.toLocaleString('en')}` + ` (\u00B1${data.cv})`}
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
            label="£"
            axisLabelComponent={<VictoryLabel y={40} x={50} angle={0}/>}
            style={{
              ticks: {stroke: "black", size: 5},
              grid: {stroke: "grey"},
              tickLabels: {fontSize: 12}
            }}
            tickCount={8}
            />
          <VictoryAxis
            tickFormat={(data) => `${data.toString()}`}
            style={{
              ticks: {stroke: "black", size: 5},
              tickLabels: {fontSize: 12}
            }}
            tickCount={6}
            />
          <VictoryLegend x={0} y={0}
            orientation="horizontal"
            gutter={20}
            style={{ title: {fontSize: 20 } }}
            data={[
              { name: "All", symbol: { fill: "#3B7A9E" } },
              { name: "Male", symbol: { fill: "tomato" } },
              { name: "Female", symbol: { fill: "orange" } }
            ]}
          />
       </VictoryChart>

    );
  }
}

export default EarningsChart;
