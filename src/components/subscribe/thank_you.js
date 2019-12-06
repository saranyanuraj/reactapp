import React from 'react'
import Main from '../main'
import PageTitle from '../includes/page_title.js'
import SlideToTop from '../includes/slide_to_top.js'
import { Link } from 'react-router-dom'
// const axios = require('axios');
class ThankYou extends Main {
	constructor(props){
	    super(props);
	    this.check_login();
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	    }
	}
	componentDidMount(){	
	}
  	render() {
  		const top_line_img = require('../../assets/images/top-line.png');
	    return (
	    <div id="main-content">
	    	<SlideToTop />
	      	<PageTitle title="Subscribe"/>
	      	<div id="breadcrumb-wrap">
				<div className="container">
					<Link to="/">Home</Link> \ <span>
					<Link to="/subscribe">Subscribe</Link></span>					
				</div>
			</div>
			<div id="main-container">
				<div className="container">
					<div className="row col-2">
						<div className="item subscribe-form">
							<h2>Subscribe</h2>
							<div className="box24">
								<h2 className="anu" > Thank you</h2>
								<span className="opp"> We appreciate that you've taken the time to write us.</span>
							    <br /><span className="opp"> We'll get back to you very soon. </span>
							</div>
						</div>
						<div className="item">
							<img src={require("../../assets/images/subscribe-right.png")} alt=""/>
						</div>
					</div>
				</div>
			</div>
			<div className="top-line ng-scope">
				<img src={top_line_img} alt="" />
			</div>
	    </div>
	    )
  	}
}
export default ThankYou
