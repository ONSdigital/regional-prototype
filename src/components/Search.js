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
      compare: [...this.state.compare, this.addCode(e.target.value)]
    })
  }

  disableButton(array, item) {
    let found = false
    for(var i = 0; i < array.length; i++) {
      if (array[i].label === item) {
        found = true
      }
    }
    return found
  }

  handleRemove(e) {
    this.state.compare.map((item) =>
      (item.label === e.target.value ?
        this.removeLA(e.target.value): null)
    )
  }

  removeLA(target) {
  var array = [...this.state.compare];
  var index = array.map((item) => item.label).indexOf(target)
  if (index !== -1) {
      array.splice(index, 1);
      this.setState({compare: array});
    }
  }

  getCode(localAuthority) {
    for(var i in this.props.localAuthorities) {
      if(this.props.localAuthorities[i].label === localAuthority) {
        return this.props.localAuthorities[i].id
      }
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

    let url = ""

    if(this.state.compare) {
      this.state.compare.forEach((item, index, array) => {
        if(index === array.length - 1) {
          url = url + item.id
        } else {
          url = url + item.id + '&'
        }
      })
    }

    this.handleCloseSearch = this.handleCloseSearch.bind(this)
    return (
      <div>
        <div className="search search--results-page print--hide" id="searchBar">
          <div className="container">
            <form className="col-wrap search__form" action="/search">
              <h1>Filter by Local Authorities</h1>
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
        <div className="container">
          <div className="row justify-content-md-center">
            {this.state.query || this.state.show ?
              <div className="col-8 results">
              <p>Showing {showingLA.length} results of {this.props.localAuthorities.length} Local Authorities<span className="close-search" onClick={this.handleCloseSearch}>Close X</span></p>
                {showingLA.sort().map((item,key) =>
                  <div key={key} className="local-authorities">
                    <li>{item}</li>
                    <div className="btn-group">
                      <Link className="btn btn--primary" to={{pathname: '/local-authority/' + `${this.getCode(item)}/` + item.replace(/\s+/g, '-').toLowerCase(), state: this.addCode(item) }}>Go To</Link>
                      <button className={this.state.compare.length === 4 || this.disableButton(this.state.compare, item) ? "btn btn--secondary btn--secondary-disabled" : "btn btn--secondary"} value={item} onClick={this.state.compare.length === 4 || this.disableButton(this.state.compare, item) ? null : (e) => this.handleAdd(e)}>Compare</button>
                    </div>
                  </div>
                )}
              </div>
            : null }
            {this.state.compare.length > 0 ?
              <div className={this.state.show || this.state.query ? "col-4" : "col-12"}>
                <h2 className="compare-heading">Compare Local Authorities</h2>
                {this.state.compare.map((item, key) =>
                  <div key={key} className="compare local-authorities">
                    <li>{item.label}</li>
                    <button className="remove btn btn--primary-alternative btn--bold btn--large" value={item.label} onClick={(e) => this.handleRemove(e)}>X</button>
                  </div>
                )}
                {this.state.compare.length === 1 ? <Link className="compare-btn btn btn--secondary-disabled" to="">Go To Comparison</Link>: <Link className="compare-btn btn btn--secondary" to={{pathname: '/compare/' + url, state: this.state.compare}}>Go To Comparison</Link>}
              </div>
              : null
            }
            {this.state.query || this.state.show && this.state.compare.length === 0 ?
              <div className={this.state.show || this.state.query ? "col-4" : "col-12"}>
                <h2 className="compare-heading">Compare Local Authorities</h2>
                <p>You have not selected any Local Authorities to compare. Please select at least 2 (maximum 4) Local Authrorities to compare</p>
              </div> : null }
          </div>
        </div>
      </div>
    )
  }
}

export default Search;
