import React from 'react'
import Main from '../main'
const axios = require('axios');
class About extends Main {
	constructor(props){
	    super(props);
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	      	about : [],
	    }
	}
	componentDidMount(){
		this.get_about();	
	}
	get_about(){
		var self = this;
		var headers = {};
		const { config } = this.state;
		if(config.environment === 'production'){
			headers =  {
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods':'GET, POST' ,
                'Access-Control-Allow-Origin': config.origin	            
        	};
		}
		axios.get(this.state.config.api_url+"about", {
		    params: {
		      _format: "json"
		    },
		    headers : headers
	  	})
	  	.then(function (response) {
	  		self.setState({
	            about: response.data
	        });
	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	})
	  	.then(function () {
	    	// always executed
	  	}); 
	}
	render() {
  		const { about } = this.state;
	    return (
	    	<div className="about-studio container">
				{about.map((row, index) => (
            		<div className="item" key={index} dangerouslySetInnerHTML={{__html: row.body}}>            
            		</div>
          		))}
          		<span className="orange-circle"></span>
			</div>
	    )
	}
}
export default About