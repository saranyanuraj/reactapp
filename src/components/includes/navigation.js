import React from 'react';
import { NavLink, Link, Redirect} from 'react-router-dom'
import M from 'materialize-css'
import Main from '../main'
const axios = require('axios');
class Navigation extends Main {
	constructor(props){
		super(props);
		this.state = {
			side_nav : '',
			token : '',
			config : this.config()
		};
		this.logOut = this.logOut.bind(this);
	}
	componentDidMount() {
		document.addEventListener('DOMContentLoaded', function() {
	    	var elem = document.querySelectorAll('#main-nav');
	    	M.Sidenav.init(elem, {});
	  	});
	  	// localStorage.setItem("token", 1234);
	  	this.setState({
	  		token : localStorage.getItem("token")
	  	});
	}
	logOut(){
		const {token, config} = this.state;
		axios.post(config.origin+"studioservices/user/logout?_format=json", {
			headers : {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Connection': 'keep-alive',
                'X-CSRF-Token': token
			}
		})
	  	.then(function (response) {	  		
	  		localStorage.removeItem("token");
			this.setState({
		  		token : ""
		  	});
		  	return <Redirect to="" />
		  	// this.props.history.push("/");
	  	}).catch(function (error) {
	    	console.log(error);
	  	});
		
	}
  	render() {
  	const logo = require('./../../assets/images/logo.png');
  	const {token} = this.state;

    return (
      <header id="main-header" >
	    <div className="container">
	        <nav className="navbar top-menu">
	            <div className="nav-wrapper">
	                <NavLink to="/" className="brand-logo">
	                    <img src={logo} alt="" />
	                </NavLink>
	                <NavLink to="#"  data-target="main-nav" className="top-nav sidenav-trigger waves-effect waves-light hide-on-large-only">
	                    <i className="material-icons">menu</i>
	                </NavLink> 
	            </div>
	        </nav>
	        <ul id="main-nav" className="sidenav sidenav-fixed" >
	            <li><NavLink exact to="/" activeClassName="active" className="sidenav-close" >HOME</NavLink></li>
	            <li><NavLink to="/media-center" activeClassName="active" className="sidenav-close" >MEDIA CENTER</NavLink></li>
	            <li className="lang"><NavLink to="/ar" activeClassName="active" className="sidenav-close" >عربى<span></span></NavLink></li>
	            {token ? 
	            	<li><Link to="/" onClick={evt => this.logOut() } className="sidenav-close">LOGOUT</Link></li>
	            	: 
					<li><NavLink exact to="/login" activeClassName="active" className="sidenav-close" >LOGIN</NavLink></li>
	            
	            }
	            
	            <li><NavLink to="/subscribe" activeClassName="active" className="sidenav-close get-started">
	            	Get started
	            	<i className="material-icons">arrow_forward</i>
	            </NavLink></li>


	        </ul>
	    </div>
	</header>
    )
  }
}
export default Navigation