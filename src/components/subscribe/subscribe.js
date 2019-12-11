import React from 'react'
import Main from '../main'
import SlideToTop from '../includes/slide_to_top.js'
import PageTitle from '../includes/page_title.js'
import { Link  } from 'react-router-dom'
import Popup from "reactjs-popup";
const axios = require('axios');
var contact_form = {
	name : { value : "", error : "", class : ""},
	email_address : { value : "", error : "", class : ""},
	mobile_number : { value : "", error : "", class : ""},
	best_describe : { value : "schoolrepresent", error : "", class : ""},
	other_text : { value : "", error : "", class : ""},
	webform_id : 'subscribe',
	iagree : false,
	submit : false

};
class Subscribe extends Main {
	constructor(props){
	    super(props);
	    this.check_login();
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	      	contact_form : contact_form,
	      	// error : '',
	    }
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit     = this.onSubmit.bind(this);
	}
	componentDidMount(){	
		// console.log(this.state);
		// await this.filter_menu();
		// const { contact_form, config } = this.state;
		
	}
	handleChange = (field , value) => {
		// <Redirect to="/" push={true} />
		// let history = useHistory();	

		var contact_form = this.state.contact_form;
		 switch(field) {
		    case 'email_address':
		    	var emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      			contact_form[field]['class'] = emailValid ? '' : 'invalid';
      			contact_form[field]['value'] = value;
		    break;
		    case 'best_describe':
		    	contact_form[field]['value'] = value;
		    	contact_form['other_text']['value'] = '';
		    break;
		    case 'iagree':
		    	contact_form[field] = !contact_form[field];
		    break;
		    default:
		    	contact_form[field]['class'] = value ? '' : 'invalid';
		    	contact_form[field]['value'] = value;
		    break;
		}
		var submit = true;
		for(var key in contact_form){
			var data = contact_form[key];
			if ( (key === 'iagree' && !data) || 
				(data.hasOwnProperty('value') && key !== 'other_text' && (data['class'] || !data['value']) ) || 
				(key === 'other_text' && contact_form.best_describe.value === '_other_' && (data['class'] || !data['value']) ) 
				
			) { 
				submit = false;
			}			
		}
		contact_form.submit = submit;
		this.setState({contact_form:contact_form});
	}
	onSubmit = (event) => {
		// const data = new FormData(event.target);
		event.preventDefault();
		var self = this;
		const { contact_form, config } = this.state;
		var submit_data = {};
		submit_data['terms_of_service']    = '1';
		submit_data['best_describe_other'] = '';
		submit_data['webform_id']          = 'subscribe';
		for(var key in contact_form){
			var data = contact_form[key];
			if(key === 'other_text'){
				submit_data["best_describe_other"] = data.value;
			}
			else if(data.hasOwnProperty('value')){
				submit_data[key] = data.value;
			}		
		}
		axios.get(config.origin+"session/token/", {
		    params: {
		      _format: "json"
		    }
	  	})
	  	.then(function (response) {
	  		var headers = {};
	        if(config.environment === 'production'){
				headers =  {
	                'Content-Type': 'application/json',
	                'Access-Control-Allow-Origin': '*',
	                'Accept': 'application/json',
	                'X-CSRF-Token': response.data	            
	        	};
			}
			axios.post(config.origin+"webform_rest/submit?_format=json", submit_data, {
				headers : headers
			})
		  	.then(function (response) {
		  		self.props.history.push("/thankyou");
		  		// console.log(response);
		  	})
		  	.catch(function (error) {
		    	console.log(error);
		  	});
	        
	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	});
		
	    // this.props.history.push('/')
		
	}
  	render() {
  		const top_line_img = require('../../assets/images/top-line.png');
  		const { contact_form } = this.state;
	    return (
	    <div id="main-content">
	    	<SlideToTop />
	      	<PageTitle title="Subscribe"/>
	      	<div id="breadcrumb-wrap">
				<div className="container">
					<Link to="/">Home</Link> \ <span>
					<Link to="/subscribe">Subscribe</Link></span>					
				</div>
			</div>
			<div id="main-container">
				<div className="container">
					<div className="row col-2">
						<div className="item subscribe-form">
							<h2>Subscribe</h2>
							<p>Subscribe now to get the latest update</p>
							<p className="instruction">Please fill out the form below to receive our update</p>
							<form name="subscribe" onSubmit={this.onSubmit} className="subscribe-form">
								<div className="row col-2">
									<div className="input-field item">
										<input name="name"  
											placeholder="Name" 
											onChange={evt => this.handleChange('name', evt.target.value) }
											onFocus={evt => this.handleChange('name', evt.target.value) }
											id="name" 
											type="text" 
											className={"validate "+contact_form.name.class } 
											required
										/>
								        <label htmlFor="name">Name</label>
								        <span className="helper-text" data-error="Required field."></span>							      
									</div>
									<div className="input-field item">
										<input name="email_address"  
											placeholder="Email" 
											onChange={evt => this.handleChange('email_address', evt.target.value) }
											onFocus={evt => this.handleChange('email_address', evt.target.value) }
											id="email_address" 
											type="email" 
											className={"validate "+contact_form.email_address.class } 
											required
										/>
										<label htmlFor="email">Email</label>
								        <span className="helper-text" data-error="Please enter a valid email address"></span>
									</div>
								</div>
								<div className="row col-2">
									<div className="input-field item">
										<input name="mobile_number"  
											placeholder="Mobile Number" 
											onChange={evt => this.handleChange('mobile_number', evt.target.value) }
											onFocus={evt => this.handleChange('mobile_number', evt.target.value) }
											id="mobile_number" 
											type="text" 
											className={"validate "+contact_form.mobile_number.class } 
											required
										/>
										<label htmlFor="mobile_number">Mobile Number</label>
								        <span className="helper-text" data-error="Required field"></span>
									</div>
								</div>
								<div className="form-check">
									<div className="text-item">
										<h4>How you best describe yourself?</h4>
									</div>
									<div className="input-radio">
										<div>
											<label>
												<input name="best_subscribe" type="radio" 
												onClick={evt => this.handleChange('best_describe', 'schoolrepresent')}
												className="radio-btn" defaultChecked />
												<span>School representative</span>
											</label>
										</div>	
										<div>
											<label>
												<input name="best_subscribe" type="radio"
												onClick={evt => this.handleChange('best_describe', 'Parents')}
												className="radio-btn" />
												<span>Parents</span>
											</label>
										</div>	
										<div>
											<label>
												<input name="best_subscribe" type="radio" 
												onClick={evt => this.handleChange('best_describe', 'Student')}
												className="radio-btn" />
												<span>Student(7-18)</span>
											</label>
										</div>	
										<div>
											<label>
												<input name="best_subscribe"  type="radio" 
												onClick={evt => this.handleChange('best_describe', '_other_')}
												className="radio-btn" />
												<span>Other</span>
											</label>
										</div>	
										{ contact_form.best_describe.value === '_other_' &&
											<div id="other-field" className="input-field item">
												<input name="other_text"  
													onChange={evt => this.handleChange('other_text', evt.target.value) }
													onFocus={evt => this.handleChange('other_text', evt.target.value) }
													id="other_text"
													placeholder="Other" 
													type="text" 
													className={"validate "+contact_form.other_text.class } 
													required
												/>
										        <span className="helper-text" data-error="Required field"></span>
											</div>	
										}				
									</div>
									<input type="hidden" defaultValue={contact_form.webform_id} name="webform_id" />
									<div className="input-check">
										<div>
											<label>
												<input type="checkbox" 
												onChange={evt => this.handleChange('iagree', '')}
												required />
												<span>I agree to the studio 56 <Popup trigger={<Link to="/subscribe">Privacy Policy</Link>} 
												 position="right center">
    											<div>Privacy policy !!</div>
  												</Popup></span>
												 
											</label>
										</div>
									</div>
								</div>
								
								<div className="btn-wrap">
									<button className="btn red subscribe" >
										Subscribe <i className="material-icons">arrow_forward</i>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="top-line ng-scope">
				<img src={top_line_img} alt="" />
			</div>
	    </div>
	    )
  	}
}
export default Subscribe
