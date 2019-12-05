import React from 'react';
import { NavLink} from 'react-router-dom'
import M from 'materialize-css'
class Navigation extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			side_nav : ''
		};
	}
	componentDidMount() {
		document.addEventListener('DOMContentLoaded', function() {
	    	var elem = document.querySelectorAll('#main-nav');
	    	M.Sidenav.init(elem, {});
	  	});
	}

  	render() {
  	const logo = require('./../../assets/images/logo.png');
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
	            <li><NavLink to="/subscribe" activeClassName="active" className="sidenav-close get-started">
	            	Get started
	            	<i className="material-icons">keyboard_backspace</i>
	            </NavLink></li>
	        </ul>
	    </div>
	</header>
    )
  }
}
export default Navigation