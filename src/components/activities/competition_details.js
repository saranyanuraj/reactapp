import React from 'react'
import Main from '../main'
import Slider from "react-slick";
const axios = require('axios');
class CompetitionDetails extends Main {
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
				<div className="row">
					<div className="col s6">
						<h4>Details</h4>
						<table><tbody>
							<tr>
								<th>Venue</th>
								<td>{result.address}</td>
							</tr>
							<tr>
								<th>Date</th>
								<td>{result.startdate}-{result.enddate}</td>
							</tr>
							<tr>
								<th>Zone</th>
								<td>{result.zone}</td>
							</tr>
							<tr>
								<th>Class No</th>
								<td></td>
							</tr>
							<tr>
								<th>Trainer Name</th>
								<td></td>
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
					<div className="col s6">
						<h4>Location</h4>
					</div>
				</div>
			</div>
	    )
  	}
}
export default CompetitionDetails
