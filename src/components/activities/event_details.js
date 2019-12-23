import React from 'react'
import Main from '../main'
import Slider from "react-slick";
const axios = require('axios');
class EventDetails extends Main {
	constructor(props){
	    super(props);
	    this.check_login();
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	      	gallery : []
	    }
	}
	componentDidMount(){	
		const {id} = this.props;
		var self                 = this;
		const { config }         = this.state;
		axios.get(config.api_url+"activity-detail-gallery/"+id, {
		    params: {
		      _format: "json"
		    }
	  	})
	  	.then(function (response) {
	  		self.setState({gallery : response.data['media-gallery']});
	  	});

	}
  	render() {
  		const {result} = this.props;
  		const {gallery} = this.state;
  		const slick_settings = {
					      	speed: 500,
					      	slidesToShow: 1,
					      	slidesToScroll: 1
					    };
	    return (
		    <div className="competition">
				<h2>{result.eventname}</h2>
				<div className="description" dangerouslySetInnerHTML={{__html: result.details}}></div>
				<Slider {...slick_settings}>
				{gallery.map((row, index) => (
					<div className="item" key={index}>
		            	<img src={row} alt="" />
		          	</div>
		        ))}
				</Slider>
				<div className="row  details-wrap">
					<div className="col s6 main-details">
						<h4>Details</h4>
						<table><tbody>
							<tr>
								<th>Start Date</th>
								<td>{result.startdate}</td>
							</tr>
							<tr>
								<th>End Date</th>
								<td>{result.enddate}</td>
							</tr>
							<tr>
								<th>Zone/Address</th>
								<td>{result.zone}/{result.address}</td>
							</tr>
							<tr>
								<th>Age Group</th>
								<td>{result.age_group}</td>
							</tr>
							<tr>
								<th>Gender</th>
								<td>{result.gender}</td>
							</tr>
							<tr>
								<th>No of Attendee</th>
								<td>{result.attendees}</td>
							</tr>
						</tbody></table>
					</div>
					<div className="col s6 main-map">
						<h4>Location</h4>
					</div>
				</div>
			</div>
	    )
  	}
}
export default EventDetails
