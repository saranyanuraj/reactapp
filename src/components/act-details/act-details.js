import React from 'react'
import Main from '../main'
import { Link } from 'react-router-dom'
import PageTitle from '../includes/page_title.js'
import SlideToTop from '../includes/slide_to_top.js'
import Slider from "react-slick";
const axios = require('axios');
class ActivityDetails extends Main {
	constructor(props){
	    super(props);
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	      	media : [],
	      	slider : [],
	      	page_key : '',
	      	pagetitle:'',
	      	id : ''
	    }
	}
	componentDidMount(){
		this.get_media();
	}
	get_media(){
		var self = this;
		const {match : {params}} = this.props;
		const { config } = this.state;
		axios.get(this.state.config.api_url+"activity-details/"+params.id, {
		    params: {
		      _format: "json"
		    }
	  	})
	  	.then(function (response) {
	  		var category = response.data[0]['category'];
	  		var type = response.data[0]['type'];
	  		if(type === 'Competitions'){
	  			self.setState({
			            pagetitle: 'Competitions',
			        });
	  		}
	  		if(type === 'Events'){
	  			self.setState({
			            pagetitle: 'Events',
			        });
	  		}
	  		if(type === 'Sessions'){
	  			self.setState({
			            pagetitle: 'Sessions',
			        });
	  		}
	  		console.log(type);
	  		self.setState({
	            media: response.data,
	            page_key : category
	        });
	        if(category === 'Gallery'){
	        	axios.get(config.api_url+"media-detail-gallery/"+params.id, {
				    params: {
				      _format: "json"
				    },
			  	})
			  	.then(function (response) {
			  		self.setState({
			            slider: response.data['media-gallery']
			        });
			  	})
			  	.catch(function (error) {
			    	console.log(error);
			  	});
	        }

	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	});
	}
  	render() {    
	  	let { media, page_key, slider} = this.state;
	  	const top_line_img = require('../../assets/images/top-line.png');
	  	const slider_settings = {
	  		className: "slider",
		    dots: true,
		    infinite: true,
		    speed: 500,
      		slidesToShow: 1,
		    slidesToScroll: 1,
	      	centerMode: true,
      		centerPadding: "60px",
		};
	    return (
	         <div id="main-content">
	         <SlideToTop />
	      	<PageTitle title="Subscribe with Activities"/>
	       
	       </div>
	    )
  	}
}
export default ActivityDetails