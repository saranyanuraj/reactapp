import React from 'react'
import Main from '../main'
import { Link } from 'react-router-dom'
import Banner from './banner'
import About from './about'
import Zone from './zone'
import News from './news'

// const axios = require('axios');
class Home extends Main {
	constructor(props){
	    super(props);
	    this.check_login();
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	      	error : '',
	    }
	}
	componentDidMount(){	

	}
	// images/mail.svg
  	render() {
  		const top_line_img = require('../../assets/images/top-line.png');
  		const mail_icon = require('../../assets/images/mail.svg');
  		const top_images = [
  			require('../../assets/images/top-1.png'),
  			require('../../assets/images/top-2.png'),
  			require('../../assets/images/top-3.png'),
  			require('../../assets/images/top-4.png'),
  		];
  		// const { error, isLoaded	} = this.state;
	    return (
	      <div id="main-content">
	      	<Banner />
			<div className="top-line">
				<img src={top_line_img} alt="" />
			</div>
			<About />
			<div className="top-images ng-scope">
				{top_images.map((row, index) => (
            		<div className="item" key={index} >
            			<img src={row} alt="" />            
            		</div>
          		))}
			</div>
			<Zone />
			<News />
			<div id="register-wrap" className="ng-scope">
				<div className="container">
					<span className="multi-square-orange"><b><i></i></b></span>
					<div><img src={mail_icon} className="mail-icon" alt="" /></div>
					<p>Our latest insights, delivered straight to your inbox</p>
					<p><Link to="/subscribe" className="red-btn btn">Register<i className="material-icons" >arrow_forward</i></Link></p>
				</div>
			</div>
	      </div>
	    )
  	}
}
export default Home