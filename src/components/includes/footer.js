import React from 'react'
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
      </div>
    )
  }
}
export default Footer