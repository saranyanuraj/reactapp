import React, { Component } from 'react'
import SlideToTop from './includes/slide_to_top.js'
class Notfound extends Component{
	render(){
		return (<div id="main-content" className="page-not-found center">
					<SlideToTop />
					<h2>Page Not found</h2>
				</div>)
	}
}
export default Notfound