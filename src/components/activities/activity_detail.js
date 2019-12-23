import React from 'react'
import Main from '../main'
import SlideToTop from '../includes/slide_to_top.js'
import PageTitle from '../includes/page_title.js'
import CompetitionDetails from './competition_details'
import EventDetails from './event_details'
import SessionDetails from './session_details'
import { Link  } from 'react-router-dom'

const axios = require('axios');

class ActivityDetails extends Main {
	constructor(props){
	    super(props);
	    this.check_login();
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	      	result : [],
	      	page_title : ""
	    }
	}
	componentDidMount(){	
		var self                 = this;
		const {match : {params}} = this.props;
		const { config }         = this.state;
		axios.get(config.api_url+"activity-details/"+params.id, {
		    params: {
		      _format: "json"
		    }
	  	})
	  	.then(function (response) {
			var type     = response.data[0]['type'];
			self.setState({
				page_title : type+" Details",
				result : response.data[0],
				isLoaded : true
			});
	  	});
	}
	
  	render() {
		const top_line_img                     = require('../../assets/images/top-line.png');
		const { page_title, isLoaded, result } = this.state;
		const {match : {params}}               = this.props;		
	    return (
	    <div id="main-content" className="activity-details">
	    	<SlideToTop />
	      	<PageTitle title={page_title}/>
	      	<div id="breadcrumb-wrap">
				<div className="container">           
					<Link to="/">Home</Link> \ <span>
					<Link to={"/activity/"+params.id}>{page_title}</Link></span>					
				</div>
			</div>
			<div id="main-container">
				<div className="container">
					{(isLoaded && result.type === "Competitions") ?
						<CompetitionDetails result={result} id={params.id}/> :
						(isLoaded && result.type === "Events") ?  
						<EventDetails result={result} id={params.id}/> :
						(isLoaded && result.type === "Sessions") ?  
						<SessionDetails result={result} id={params.id}/> :
						""
					}
				</div>			
			</div>
			<div className="top-line ng-scope">
				<img src={top_line_img} alt="" />
			</div>
	    </div>



	    )
  	}
}
export default ActivityDetails
