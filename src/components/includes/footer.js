import React from 'react'
import SlideToTop from './slide_to_top.js'
class Footer extends React.Component {
  render() {
    const year = new Date().getFullYear();
    const footer_logo = require('../../assets/images/footer-logo.png');
    return (
      <div id="footer" className="ng-scope">
        <div className="container">
          <img src={footer_logo} className="footer-logo" alt="" />
          <div className="copy-text">All Rights Reserved to The Ministry of Transportation and Communication (Studio 5/6)-{year}.</div>
        </div>
        <SlideToTop button="true"/>
      </div>
    )
  }
}
export default Footer