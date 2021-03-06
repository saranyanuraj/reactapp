import React from 'react'
import Main from '../main'
import Slider from "react-slick"
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
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
				<div className="row details-wrap">
					<div className="col s6 main-details">
						<h4>Details</h4>
						<table><tbody>
							<tr>
								<th>Venue</th>
								<td dangerouslySetInnerHTML={{__html: result.address}}></td>

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
								<td>{result.field_class_room}</td>

							</tr>
							<tr>
								<th>Trainer Name</th>
								<td>{result.field_trainer_name}</td>

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
						<div className="google-map" >
					    	<Map google={this.props.google}
							    className={'map'} 
							    initialCenter={{
						            lat: result.latitude,
						            lng: result.longitude
						        }}
							    zoom={14}>
							  <Marker
							    // title={result.address}
							    // name={'SOMA'}
							    position={{lat: result.latitude, lng: result.longitude}} />
							</Map>
		        		</div>
					</div>
				</div>
			</div>
	    )
  	}
}
var main_obj = new Main();
export default GoogleApiWrapper({
  apiKey: main_obj.config().map_api_key
})(CompetitionDetails);