import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryGroup } from 'victory';

class WellBeingChart extends Component {
  render() {
    const local = this.props.local.sort((a,b) => a.z - b.z)
    const uk = this.props.uk.sort((a,b) => a.z - b.z)
    return(
      <VictoryChart>
        <VictoryGroup
          offset={25}
          style={{ data: { width: 20 } }}
          colorScale={this.props.color}
          >
          <VictoryBar data={local} />
          <VictoryBar data={uk} />
        </VictoryGroup>


        <VictoryAxis />
      </VictoryChart>
    )
  }
}

export default WellBeingChart
