import React, {Component} from 'react';
import {getCMDLink} from '../api/RequestHandler';

class CMDLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterID: ''
    }
  }

  componentDidMount() {
    let datasetID = this.props.dataset
    let locationID = this.props.localAuth
    let body = this.props.body
    let query =
        '{"dataset":{"id": "' + datasetID + '","edition": "time-series","version": 1},"dimensions": [{"name": "geography","options": ["' + locationID +'"]}, ' + body + ']}'

    getCMDLink(query)
      .then((response) => this.setState({filterID: response.filter_id}))
      .catch((error) => console.log(error))
  }
  render() {
    return(
      <a className={this.props.className} target="blank" href={"https://beta.ons.gov.uk/filters/" + this.state.filterID + "/use-latest-version"}>Customise this data futher in CMD <span className={`icon icon-external--${this.props.icon}-small`}></span></a>
    )
  }
}

export default CMDLink;
