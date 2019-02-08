import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="print--hide">
        <h2 className="visuallyhidden">Footer links</h2>
            <div className="footer">
                <div className="wrapper">
                    <nav>
                        <div className="footer-nav col-wrap">
                            <div className="col col--lg-one-third col--md-one-third">
                                <h3 className="footer-nav__heading">Help</h3>
                                <ul className="footer-nav__list">
                                    <li className="footer-nav__item">
                                        <a href="/help/accessibility">Accessibility</a>
                                    </li>
                                    <li className="footer-nav__item">
                                        <a href="/help/cookiesandprivacy">Cookies and privacy</a>
                                    </li>
                                    <li className="footer-nav__item">
                                        <a href="/help/termsandconditions">Terms and conditions</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col col--lg-one-third col--md-one-third">
                                <h3 className="footer-nav__heading">About ONS</h3>
                                <ul className="footer-nav__list">
                                    <li className="footer-nav__item">
                                        <a href="/aboutus/whatwedo">What we do</a>
                                    </li>
                                    <li className="footer-nav__item">
                                        <a href="/aboutus/careers">Careers</a>
                                    </li>
                                    <li className="footer-nav__item">
                                        <a href="/aboutus/contactus">Contact us</a>
                                    </li>
                                    <li className="footer-nav__item">
                                        <a href="/news">News</a>
                                    </li>
                                    <li className="footer-nav__item">
                                        <a href="/aboutus/transparencyandgovernance/freedomofinformationfoi">Freedom of Information</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col col--lg-one-third col--md-one-third">
                                <h3 className="footer-nav__heading">Connect with us</h3>
                                <ul className="footer-nav__list">
                                    <li className="footer-nav__item">
                                        <a href="https://twitter.com/ONS" className="icon--hide">Twitter</a>
                                    </li>
                                    <li className="footer-nav__item">
                                        <a href="https://www.facebook.com/ONS" className="icon--hide">Facebook</a>
                                    </li>
                                    <li className="footer-nav__item">
                                        <a href="https://www.linkedin.com/company/office-for-national-statistics" className="icon--hide">LinkedIn</a>
                                    </li>
                                    <li className="footer-nav__item">
                                        <a href="https://public.govdelivery.com/accounts/UKONS/subscribers/new" className="icon--hide">Email alerts</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="wrapper">
                    <div className="footer-license">
                        <img className="footer-license__img" alt="OGL" width="60" src="https://www.ons.gov.uk/img/ogl.png" />
                        <p className="footer-license__text margin-left-sm--0">
                            All content is available under the <a className="icon--hide" href="http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government Licence v3.0</a> <span className="icon icon-external--light-small"></span>, except where otherwise stated
                    </p>
                </div>
            </div>
        </div>
     </footer>
    )
  }
}

export default Footer
