import React from 'react'
import Main from '../main'
const axios = require('axios');
class Zone extends Main {
	constructor(props){
	    super(props);
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	      	zones : [],
	    }
	}
	componentDidMount(){
		this.get_zone();	
	}
	get_zone(){
		var self = this;
		axios.get(this.state.config.api_url+"zones", {
		    params: {
		      _format: "json"
		    }
	  	})
	  	.then(function (response) {
	  		self.setState({
	            zones: response.data
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
  		// const { zones } = this.state;
	    return (
	    	<div className="zone-wrap">
				<div className="container">
					<div className="zone-text">
						<h3>Zone</h3>
						<div>Studio 5/6 has three main zones to provide the kids extraordinary learning experiences.</div>
					</div>
					<div className="service-zone">
						<div className="flex-row col-3 ng-scope">
							
						</div>
						<span className="grey-square"></span>
					</div>
				</div>
			</div>
	    )
	}
}
export default Zone