import React, {Component} from 'react';
import {getCMDLink} from '../api/RequestHandler';

class CMDLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterID: '',
      text: ''
    }
  }

  componentDidMount() {
    let datasetID = this.props.dataset
    let locationID = ""
    let text = ""
    if(typeof this.props.localAuth === 'string') {
      locationID = `["${this.props.localAuth}"]`
      text = "Customise this data futher in CMD "
    } else {
      text = "Customise this data futher and compare more regions in CMD "
      this.props.localAuth.forEach((item, index) => {
        if(this.props.localAuth.length - 1 === index) {
          locationID = locationID + `"${item.id}"`
        } else {
          locationID = locationID + `"${item.id}", `
        }

      })
      locationID = `[${locationID}]`
    }
    this.setState({
      text: text
    })
    let body = this.props.body
    let query =
        '{"dataset":{"id": "' + datasetID + '","edition": "time-series","version": 1},"dimensions": [{"name": "geography","options": ' + locationID + '}, ' + body + ']}'

    getCMDLink(query)
      .then((response) => this.setState({filterID: response.filter_id}))
      .catch((error) => console.log(error))
  }
  render() {
    return(
      <a className={this.props.className} target="blank" href={"https://beta.ons.gov.uk/filters/" + this.state.filterID + "/use-latest-version"}>{this.state.text}<span className={`icon icon-external--${this.props.icon}-small`}></span></a>
    )
  }
}

export default CMDLink;
