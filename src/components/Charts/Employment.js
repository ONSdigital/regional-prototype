import React, {Component} from 'react';
import { VictoryBar } from 'victory';

class Employment extends Component {
  constructor() {
    super();
    this.state = {
      zoomDomain: { x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] }
    };
  }

  handleZoom(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    return (
      <div>
        <VictoryBar />
      </div>
    );
  }
}

export default Employment;
