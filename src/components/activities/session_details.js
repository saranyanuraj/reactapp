import React from 'react'
import Main from '../main'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
// const axios = require('axios');
class SessionDetails extends Main {
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
  		const {result} = this.props;
  		var materials  =result.field_materials.split(',').map(function (material, index) {
  			return <div className="item"><div className="img-wrap"></div><p key={index}>{ material }</p></div>;
  		});
	    return (
		    <div className="session-details">
				<h2>{result.eventname}</h2>
				<div className="description" dangerouslySetInnerHTML={{__html: result.details}}></div>
				<h2>Learning Objectives</h2>
				<div className="description" dangerouslySetInnerHTML={{__html: result.learning}}></div>
					<h4>Details</h4>
				
					<div className="row">
						<div className="col s6">
							<table>
								<tbody>
									<tr>
										<th>Category</th>
										<td>{result.field_session_category}</td>

									</tr>
									<tr>
										<th>Start Date</th>
										<td>{result.startdate}</td>

									</tr>
									<tr>
										<th>End Date</th>
										<td>{result.enddate}</td>

									</tr>
									<tr>
										<th>Venue</th>
										<td></td>

									</tr>
									<tr>
										<th>Zone/Address</th>
										<td dangerouslySetInnerHTML={{__html: result.zone+"/"+result.address}}></td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="col s6">
							<table>
								<tbody>
									<tr>
										<th>Trainer Name</th>
										<td>{result.field_trainer_name}</td>
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
										<th>Class Room</th>
										<td>{result.field_class_room}</td>
									</tr>
									<tr>
										<th>No of Attendee</th>
										<td>{result.attendees}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="equipment-use">
						<h4>Equipment Used</h4>
						<div className="input-field item">
							<input name="Title" placeholder="Equipment Used" type="text"  value ="Equipment"/>
						</div>
					</div>
					<div className="materials-wrap">
						<h4>Materials</h4>
						<div className="flex-row">
						{materials}
						</div>
					</div>				

					<div className="row machine-location">
						<div className="col s6">
							<h4>Machines</h4>
							
						</div>

						<div className="col s6">
							<div className="location">
								<h4>Location</h4>
								<div className="google-map" >
							    	<Map google={this.props.google} className={'map'} initialCenter={{lat: result.latitude,lng: result.longitude}}zoom={14}>
									  <Marker
									    // title={result.address}
									    // name={'SOMA'}
									    position={{lat: result.latitude, lng: result.longitude}} />
									</Map>
					    		</div>
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
})(SessionDetails); 