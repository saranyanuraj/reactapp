import React from 'react'
import Main from '../main'
const axios = require('axios');
class Banner extends Main {
	constructor(props){
	    super(props);
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	      	banner : [],
	    }
	}
	componentDidMount(){
		this.get_banner();	
	}
	get_banner(){
		var self = this;
		axios.get(this.state.config.api_url+"banner", {
		    params: {
		      _format: "json"
		    }
	  	})
	  	.then(function (response) {
	  		self.setState({
	            banner: response.data
	        });
	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	});			
	}
	render() {
  		const {  banner } = this.state;
	    return (
	    	<div className="app-slider">
		        <div className="video-box">
					<video autoPlay playsInline muted loop>
						<source src="http://13.81.209.109/sites/default/files/2019-10/Homebanner-hd.m4v" type="video/mp4" />
						<source src="http://13.81.209.109/sites/default/files/2019-10/Homebanner-hd.webm" type="video/webm" />
						<source src="http://13.81.209.109/sites/default/files/2019-10/Homebanner-hd.ogv" type="video/ogg" />
						<source src="http://13.81.209.109/sites/default/files/2019-10/Homebanner-hd.mp4" />
					</video>
				</div>
				<div className="banner">
					{banner.map((row, index) => (
						<div className="" key={index}>
							<div className="desc" dangerouslySetInnerHTML={{__html: row.body}}></div>
						</div>
					))}
				</div>
				<div className="banner-text-wrapper">
					<div className="banner-text">
						<h1>Studio 5/6</h1>
						<h3><span className="red-text">foster innnovation</span>, <span className="blue-text">imagination <b>and</b> <span className="orange-text">creativity</span></span></h3>
						<p><b>Studio 5/6 </b>is mainly aimed at nurturing youth as digital learners by sharpening their 21st century learning skills, as they develop in an all-pervasive digitavvl environment.</p>
					</div>
				</div>
	        </div>
	    )
	}
}
export default Banner