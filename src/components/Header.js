import React from 'react';

const Header = () => (
  <div className="container">
  	<div className="header col-wrap">
  		<div className="col col--lg-one-third col--md-one-third">
  			<a href="/">
					<img className="logo" src="https://cdn.ons.gov.uk/assets/images/ons-logo/v2/ons-logo.svg" alt="Office for National Statistics" />
  			</a>
  		</div>
  		<div className="col col--lg-two-thirds col--md-two-thirds print--hide">&nbsp;</div>
    </div>
  </div>
)

export default Header
