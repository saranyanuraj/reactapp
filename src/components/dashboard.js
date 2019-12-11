import React from 'react'
import Main from './main'
import SlideToTop from './includes/slide_to_top.js'
import PageTitle from './includes/page_title.js'
import { Link } from 'react-router-dom'
// const axios = require('axios');

class Dashboard extends Main {
	constructor(props){
	    super(props);
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	    }
	}
	componentDidMount(){
		// this.get_banner();	
	}
	
	render() {
	    return (
	    	<div id="main-content">
				<SlideToTop />
		      	<PageTitle title="Dashboard"/>
		      	<div id="breadcrumb-wrap">
					<div className="container">
						<Link to="/">Home</Link> \ <span>
						<Link to="/dashboard">Dashboard</Link></span>					
					</div>
				</div>
				<div id="main-container">
					<div className="container">
						<div className="row col-8">
							
						</div>
					</div>
				</div>
	        </div>
	    )
	}
}
export default Dashboard