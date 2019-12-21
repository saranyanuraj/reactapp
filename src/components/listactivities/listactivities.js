import React from 'react'
import Main from '../main'
import SlideToTop from '../includes/slide_to_top.js'
import PageTitle from '../includes/page_title.js'
import { Link  } from 'react-router-dom'

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
class ListActivicties extends Main {
	constructor(props){
	    super(props);
	    this.check_login();
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	      	contact_form : contact_form,
	      	activity : [],
	      	actpager:'',
	      	// error : '',
	    }
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit     = this.onSubmit.bind(this);
	}
	componentDidMount(){	
		// console.log(this.state);
		// await this.filter_menu();
		// const { contact_form, config } = this.state;
		this.get_activity();
	}
	get_activity(){
		var self = this;
		axios.get(this.state.config.api_url+"activicties?_format=json&type=All&title=&field_start_end_dates_value=", {
		 
	  	})
	  	.then(function (response) {
	  		console.log(response.data.pager);
	  		self.setState({
	            activity: response.data.results
	        });
	        self.setState({
	            actpager: response.data.pager
	        });
	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	});
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
  		const { activity } = this.state;
  		const { actpager } = this.state;
	    return (
	    <div id="main-content">
	    	<SlideToTop />
	      	<PageTitle title="Subscribe with Activities"/>
	      	<div id="breadcrumb-wrap">
				<div className="container">           
					<Link to="/">Home</Link> \ <span>
					<Link to="/listactivities">Subscribe with Activities</Link></span>					
				</div>
			</div>
			<div id="main-container">
				<div className="container">
				<div className="search-wrap">
                    <form name="activity" onSubmit={this.onSubmit} className="activity-form">
                    <div className="row col-6">
                      <div className="input-field item">
                      <input name="name"  
											placeholder="Search" 
											onChange={evt => this.handleChange('name', evt.target.value) }
											onFocus={evt => this.handleChange('name', evt.target.value) }
											id="name" 
											type="text" 
											className={"validate "+contact_form.name.class } 
											
										/>
					 <label htmlFor="name">Title</label>
                      </div>
                    </div>
                    <div className="row col-4">
                      <div className="input-field item">
                      <input name="date"  
											placeholder="Date" 
											onChange={evt => this.handleChange('name', evt.target.value) }
											onFocus={evt => this.handleChange('name', evt.target.value) }
											id="name" 
											type="text" 
											className={"validate "+contact_form.name.class } 
											
										/>
					 <label htmlFor="date">Date</label>
                      </div>
                    </div>
                    <div className="row col-2">
                      <div className="input-field item">
                      <button className="btn yellow login" >Search
                      <i className="material-icons">arrow_forward</i>
									</button>
                      </div>
                    </div>
                    </form>
                    </div>
				</div>
			</div>
			
			
			<h4 className="sub-title">Search Results ( 0 of {actpager.count} )</h4>
				
              <div className="school-wrap">
              {activity.map((row, index) => (
	          <div className="school-list" key={index}>
		      <div className="row col-8">
			    	<h3>{row.title} <span className="section">{row.type}</span></h3>
				<div className="date-wrap">
					<span className="start-date"><i className="icon calendar"></i>{row.startdate} </span>
					<span className="end-date"><i className="icon calendar"></i>{row.enddate} </span>
				</div>
			  </div>
			  <div className="col s4">
				<div className="btn-wrap">
					<a href={"/act-details/"+row.id} className="btn line blue">Details</a>
					<a href="#" className="btn blue">Enroll</a>
				</div>
			</div>
			  </div>
			  ))}
			  </div>
			<div className="top-line ng-scope">
				<img src={top_line_img} alt="" />
			</div>
	    </div>
	    )
  	}
}
export default ListActivicties
