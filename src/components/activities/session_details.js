import React from 'react'
import Main from '../main'
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
	    return (
		    <div className="competition">
				<h2>{result.eventname}</h2>
				<div className="description" dangerouslySetInnerHTML={{__html: result.details}}></div>
				
				<div className="row">
					<div className="col s12">
						<h4>Details</h4>
						<table><tbody>
							<tr>
								<th>Category</th>
								<td></td>
								<th>Trainer Name</th>
								<td></td>
							</tr>
							<tr>
								<th>Start Date</th>
								<td>{result.startdate}</td>
								<th>Age Group</th>
								<td>{result.age_group}</td>
							</tr>
							<tr>
								<th>End Date</th>
								<td>{result.enddate}</td>
								<th>Gender</th>
								<td>{result.gender}</td>
							</tr>
							<tr>
								<th>Venue</th>
								<td></td>
								<th>Class Room</th>
								<td></td>
							</tr>
							<tr>
								<th>Zone/Address</th>
								<td>{result.zone}/{result.address}</td>
								<th>No of Attendee</th>
								<td>{result.attendees}</td>
							</tr>
						</tbody></table>
					</div>
				</div>
			</div>
	    )
  	}
}
export default SessionDetails
