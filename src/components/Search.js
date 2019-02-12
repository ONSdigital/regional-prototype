import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import { Link } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      compare: [],
      show: false
    }
  }

  updateQuery = (query) => {
    this.setState({ query })
  }

  handleAdd(e) {
    this.setState({
      compare: [...this.state.compare, e.target.value]
    })
  }

  handleRemove(e) {
    this.state.compare.map((item) =>
      (item === e.target.value ?
        this.removeLA(e.target.value): null)
    )
  }

  removeLA(target) {
  var array = [...this.state.compare];
  var index = array.indexOf(target)
  if (index !== -1) {
      array.splice(index, 1);
      this.setState({compare: array});
    }
  }

  addCode(localAuthority) {
    for(var i in this.props.localAuthorities) {
      if(this.props.localAuthorities[i].label === localAuthority) {
        return this.props.localAuthorities[i]
      }
    }
  }

  handleSearch(e) {
    e.preventDefault()
    this.setState({
      show: true
    })
  }

  handleCloseSearch() {
    this.setState({
      query: '',
      show: false
    })
  }

  render() {
    let showingLA
    if(this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingLA = this.props.localAuthorities.map((item) => item.label).filter((LA) => match.test(LA))
    } else {
      showingLA = this.props.localAuthorities.map((item) => item.label)
    }
    this.handleCloseSearch = this.handleCloseSearch.bind(this)
    return (
      <div>
        <div className="search search--results-page print--hide" id="searchBar">
          <div className="wrapper">
            <form className="col-wrap search__form" action="/search">
              <h1>Find a Region</h1>
              <input
                aria-label="search for Local Authorities"
                className="search__input search__input--results-page col col--md-29 col--lg-29"
                id="nav-search"
                type="text"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            <button type="submit" className="search__button search__button--results-page col--md-3 col--lg-3" id="nav-search-submit" onClick={(e) => this.handleSearch(e)}>
                <span className="visuallyhidden">Search</span>
                <span className="icon icon-search--light"></span>
              </button>
            </form>
          </div>
        </div>
        <div className="wrapper">
          <div className="col-wrap">
            {this.state.query || this.state.show ?
              <div className="col col--md-two-thirds col--lg-two-thirds results">
              <p>Showing {showingLA.length} results of {this.props.localAuthorities.length} <span className="close-search" onClick={this.handleCloseSearch}>Close X</span></p>
                {showingLA.sort().map((item,key) =>
                  <div key={key} className="local-authorities">
                    <li>{item}</li>
                    <div className="btn-group">
                      <Link className="btn btn--primary" to={{pathname: '/' + item.replace(/\s+/g, '-').toLowerCase(), state: this.addCode(item) }}>Go To</Link>
                      <button className="btn btn--secondary" value={item} onClick={(e) => this.handleAdd(e)}>Add</button>
                    </div>
                  </div>
                )}
              </div>
            : null }
            {this.state.compare.length > 0 ?
              <div className="col col--md-one-third col--lg-one-third">
                <h2>Compare Local Authorities</h2>
                {this.state.compare.length > 0 ? this.state.compare.map((item, key) =>
                  <div key={key} className="compare local-authorities">
                    <li>{item}</li>
                    <button className="remove btn btn--primary-alternative btn--bold btn--large" value={item} onClick={(e) => this.handleRemove(e)}>X</button>
                  </div>
                ) :
                <p>You have not selected any local authorities yet.</p>
                }
              </div>
              : null}

          </div>
        </div>
      </div>
    )
  }
}

export default Search;
