import React from 'react'
import Main from '../main'
import SlideToTop from '../includes/slide_to_top.js'
import PageTitle from '../includes/page_title.js'
import { Link  } from 'react-router-dom'
const axios = require('axios');
var registration_form = {
	school_id : { value : "", error : "", class : "" },
	name : { value : "", error : "", class : "" },
	mail : { value : "", error : "", class : "" },
	mobile : { value : "", error : "", class : "" },
	channel_communication : { value : "mobile", error : "", class : "" },
	communication_value : { value : "", error : "", class : "" },
	repname: { value : "", error : "", class : "" },
	position : { value : "", error : "", class : "" },
    repmail:{ value : "", error : "", class : "" },
    repmob:{value : "", error : "", class : ""},
    school_country_code :{value : "", error : "", class : ""},
    rep_country_code :{value : "", error : "", class : ""},
};
class Register extends Main {
	constructor(props){
	    super(props);
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	      	school_list : [],
	      	registration_form : registration_form,
	      	error : "",
	      	submit_button : true
	    }
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit     = this.onSubmit.bind(this);
	}
	componentDidMount(){
		this.get_school_list();
	}
	componentWillUnmount(){
		// document.removeEventListener('DOMContentLoaded');
	}
	get_school_list = () => {
		var self = this;
		var { config } = this.state;
		axios.get(config.api_url+"snames", {
		    params: {
		      _format: "json"
		    }
	  	})
	  	.then(function (response) {
	  		self.setState({
	            school_list: response.data
	        });
	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	});	
	}
	handleChange = (field , value) => {
		var registration_form = this.state.registration_form;
		registration_form[field]['class'] = value ? '' : 'invalid';
		registration_form[field]['value'] = value;
		// contact_form.submit = submit;
		this.setState({registration_form:registration_form});
	}
	onSubmit = (event) => {
		event.preventDefault();
		var self = this;
		var {registration_form, config} = this.state;
		this.setState({submit_button : false});
		var school_mob = registration_form.school_country_code.value+registration_form.mobile.value;
		var rep_mob = registration_form.rep_country_code.value+registration_form.repmob.value;
		var submit_data = {
			 name: [{"value": registration_form.mail.value}],
             mail: [{"value": registration_form.mail.value}],
            field_school_name:[{"target_id":registration_form.school_id.value,"target_type":"taxonomy_term"}],
            roles:[{"target_id":"school"}],
            field_school_mobile_number:[{"value": school_mob}],
            field_channels_of_communication:[{"value": registration_form.communication_value.value}],
            field_rep_name:[{"value": registration_form.repmail.value}],
            field_rep_email_address:[{"value": school_mob}],
            field_rep_mobile_number_:[{"value": rep_mob}],
            field_rep_position:[{"value": registration_form.position.value}],

		};
		axios.post(config.origin+"RAXjZ8cYJYr6BYhD/register?_format=json", submit_data, {
			   headers : {
	                'Content-Type': 'application/json',
	                'Access-Control-Allow-Origin': '*',
	                'Accept': 'application/json',
	                'Connection': 'keep-alive',
				}
	  })
      .then(function (response) {
      	self.setState({
        	'success': 'Registration successful',
        	'error': ''
      	});
      	self.props.history.push("/thankyou");

     })
      .catch(function (error) {
      	var errorResponse = error.response.data.message;
      	errorResponse = errorResponse.replace(/(?:\r\n|\r|\n)/g, '<br />');
      	self.setState({
        	'success': '',
        	'error': errorResponse
      	});
      });
		
	}
	render() {
  		const { registration_form, school_list, error, submit_button } = this.state;
	    return (
	    	<div id="main-content">
				<SlideToTop />
		      	<PageTitle title="Register"/>
		      	<div id="breadcrumb-wrap">
					<div className="container">
						<Link to="/">Home</Link> \ <span>
						<Link to="/register">Register</Link></span>					
					</div>
				</div>
				<div id="main-container">
					<div className="container">
						<div className="row col-8">
						{error &&
									<span className="helper-text red-text">{error}</span>
								}	
							<form name="login" onSubmit={this.onSubmit} className="login-form register-form">
								<div className="input-field item">
									<select name="school_id" id="school_id"
										onChange={evt => this.handleChange('school_id', evt.target.value) }
									required>
										<option value="">--select--</option>
										{school_list.map((row, index) => (
											<option value={row.id} key={index}>{row.sname} </option>
										))}
									</select>
							        <label htmlFor="school_id">School Name</label>
							        {!registration_form.school_id.value  &&
										<span className="helper-text red-text">Required field.</span>
							        }							      
								</div>
								<div className="row mobile">
									<div className="col s3">
										<div className="input-field item">
											<input name="school_country_code"  
												placeholder="Country Code" 
												onChange={evt => this.handleChange('school_country_code', evt.target.value) }
												onFocus={evt => this.handleChange('school_country_code', evt.target.value) }
												id="school_country_code" 
												type="text" 
												minLength="3"
												maxLength="3"
												className={"validate "+registration_form.mobile.class } 
												required
											/>
									        <label htmlFor="school_country_code">Country Code</label>
									        <span className="helper-text" data-error="Enter a valid code."></span>							      
										</div>		
									</div>
									<div className="col s8">
										<div className="input-field item">
											<input name="mobile"  
												placeholder="Mobile" 
												onChange={evt => this.handleChange('mobile', evt.target.value) }
												onFocus={evt => this.handleChange('mobile', evt.target.value) }
												id="mobile" 
												type="text" 
												minLength="8"
												maxLength="8"
												className={"validate "+registration_form.mobile.class } 
												required
											/>
									        <label htmlFor="mobile">School Phone Number</label>
									        <span className="helper-text" data-error="Please lengthen this text to 8 character."></span>							      
										</div>
									</div>
								</div>
								<div className="input-field item">
									<input name="mail"  
										placeholder="Mail" 
										onChange={evt => this.handleChange('mail', evt.target.value) }
										onFocus={evt => this.handleChange('mail', evt.target.value) }
										id="mail" 
										type="email" 
										className={"validate "+registration_form.mail.class } 
										required
									/>
							        <label htmlFor="mail">School Email Address</label>
							        <span className="helper-text" data-error="Please enter a valid email address."></span>							      
								</div>
								<div><strong>Representative information</strong></div>
								<div className="input-field item">
									<input name="repname"  
										placeholder="Name" 
										onChange={evt => this.handleChange('repname', evt.target.value) }
										onFocus={evt => this.handleChange('repname', evt.target.value) }
										id="name" 
										type="text" 
										className={"validate "+registration_form.repname.class } 
										required
									/>
							        <label htmlFor="name">Name</label>
							        <span className="helper-text" data-error="Required field."></span>							      
								</div>
								<div className="input-field item">
									<input name="position"  
										placeholder="Position" 
										onChange={evt => this.handleChange('position', evt.target.value) }
										onFocus={evt => this.handleChange('position', evt.target.value) }
										id="position" 
										type="text" 
										className={"validate "+registration_form.position.class } 
										required
									/>
							        <label htmlFor="name">Position</label>
							        <span className="helper-text" data-error="Required field."></span>							      
								</div>
								<div className="row mobile">
									<div className="col s3">
										<div className="input-field item">
											<input name="rep_country_code"  
												placeholder="Country Code" 
												onChange={evt => this.handleChange('rep_country_code', evt.target.value) }
												onFocus={evt => this.handleChange('rep_country_code', evt.target.value) }
												id="rep_country_code" 
												type="text" 
												minLength="3"
												maxLength="3"
												className={"validate "+registration_form.mobile.class } 
												required
											/>
									        <label htmlFor="rep_country_code">Country Code</label>
									        <span className="helper-text" data-error="Enter a valid code."></span>							      
										</div>		
									</div>
									<div className="col s8">
										<div className="input-field item">
											<input name="repmob"  
												placeholder="Mobile Number" 
												onChange={evt => this.handleChange('repmob', evt.target.value) }
												onFocus={evt => this.handleChange('repmob', evt.target.value) }
												id="repmob" 
												type="text" 
												minLength="8"
												maxLength="8"
												className={"validate "+registration_form.repmob.class } 
												required
											/>
									        <label htmlFor="name">Mobile number</label>
									        <span className="helper-text" data-error="Required field."></span>							      
										</div>
									</div>
								</div>
								
								<div className="input-field item">
									<input name="repmail"  
										placeholder="Mail" 
										onChange={evt => this.handleChange('repmail', evt.target.value) }
										onFocus={evt => this.handleChange('repmail', evt.target.value) }
										id="repmail" 
										type="email" 
										className={"validate "+registration_form.repmail.class } 
										required
									/>
							        <label htmlFor="mail">Email Address</label>
							        <span className="helper-text" data-error="Please enter a valid email address."></span>							      
								</div>
								<div className="form-check">
									<div className="text-item">
										<h4>Channel Communication</h4>
									</div>
									<div className="input-radio">
										<div>
											<label>
												<input name="channel_communication" type="radio" 
												onClick={evt => this.handleChange('channel_communication', 'mobile')}
												className="radio-btn" defaultChecked />
												<span>Mobile</span>
											</label>
										</div>	
										<div>
											<label>
												<input name="channel_communication" type="radio" 
												onClick={evt => this.handleChange('channel_communication', 'mail')}
												className="radio-btn"  />
												<span>Mail</span>
											</label>
										</div>	
									</div>
									
								</div>
																						      
								<div className="btn-wrap">
									<button className="btn red register" disabled={!submit_button ? "disabled" : ""} >
										Register <i className="material-icons">arrow_forward</i>
									</button>
								</div>						
							</form>
						</div>
					</div>
				</div>
	        </div>
	    )
	}
}
export default Register