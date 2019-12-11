import React from 'react'
import Main from '../main'
import SlideToTop from '../includes/slide_to_top.js'
import PageTitle from '../includes/page_title.js'
import { Link  } from 'react-router-dom'
const axios = require('axios');
var login_form = {
	username : { value : "", error : "", class : ""},
	password : { value : "123456789", error : "", class : ""},

};
class Login extends Main {
	constructor(props){
	    super(props);
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	      	login_form : login_form,
	    }
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit     = this.onSubmit.bind(this);
	}
	componentDidMount(){
		// this.get_banner();	
	}
	handleChange = (field , value) => {
		var login_form = this.state.login_form;
		login_form[field]['class'] = value ? '' : 'invalid';
		login_form[field]['value'] = value;
		// contact_form.submit = submit;
		this.setState({login_form:login_form});
	}
	onSubmit = (event) => {
		event.preventDefault();
		var self = this;
		var {login_form, config} = this.state;
		var submit_data = {
			username : login_form.username.value,
			password : login_form.password.value
		};
		console.log(submit_data);
		axios.post(config.origin+"studioservices/user/login?_format=json", submit_data, {
			headers : {
				"Access-Control-Allow-Origin" : "*",
				"Content-Type" : "application/json",
			}
		})
	  	.then(function (response) {
	  		// self.props.history.push("/thankyou");
	  		console.log(response);
	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	});
	}
	render() {
  		// const {  banner } = this.state;
  		const { login_form } = this.state;
	    return (
	    	<div id="main-content">
				<SlideToTop />
		      	<PageTitle title="Login"/>
		      	<div id="breadcrumb-wrap">
					<div className="container">
						<Link to="/">Home</Link> \ <span>
						<Link to="/login">Login</Link></span>					
					</div>
				</div>
				<div id="main-container">
					<div className="container">
						<div className="row col-8">
							<form name="login" onSubmit={this.onSubmit} className="login-form">
								<div className="input-field item">
									<input name="username"  
										placeholder="Username" 
										onChange={evt => this.handleChange('username', evt.target.value) }
										onFocus={evt => this.handleChange('username', evt.target.value) }
										id="username" 
										type="text" 
										className={"validate "+login_form.username.class } 
										required
									/>
							        <label htmlFor="username">Username</label>
							        <span className="helper-text" data-error="Required field."></span>							      
								</div>
								<div className="input-field item">
									<input name="password"  
										placeholder="Password" 
										onChange={evt => this.handleChange('password', evt.target.value) }
										onFocus={evt => this.handleChange('password', evt.target.value) }
										id="password" 
										type="text" 
										className={"validate "+login_form.password.class } 
										required
									/>
							        <label htmlFor="password">Password</label>
							        <span className="helper-text" data-error="Required field."></span>							      
								</div>
								<div className="btn-wrap">
									<button className="btn red login" >
										Login <i className="material-icons">arrow_forward</i>
									</button>
								</div>								
								<Link to="/register">Register</Link>
							</form>
						</div>
					</div>
				</div>
	        </div>
	    )
	}
}
export default Login