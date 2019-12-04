import React from 'react'
import Main from '../main'
// import { Link } from 'react-router-dom'
class PageTitle extends Main {
  constructor(props){
    super(props);
    this.state = {
      isLoaded : false,
        config : this.config(),
        error : '',
    }
  }
  render() {
    const { config } = this.state;
    return (
      <div className="page-title ng-scope">
        <div className="container">
          <h1>{this.props.title}</h1>
          <div className="share-page">
            <h3>Share this page</h3>
            {config.social_media_links.facebook &&
              <a target="_blank" rel="noopener noreferrer" href={config.social_media_links.facebook} className="fb-xfbml-parse-ignore">
                <i className="fa fa-facebook">&nbsp;</i>
              </a>
            }
            {config.social_media_links.twitter &&
              <a target="_blank" rel="noopener noreferrer" href={config.social_media_links.twitter} >
                <i className="fa fa-twitter">&nbsp;</i>
              </a>
            }
            <span className="yellow-box"></span>
          </div>
        </div>
        
      </div>
    )
  }
}
export default PageTitle