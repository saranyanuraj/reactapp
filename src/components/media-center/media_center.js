import React from 'react'
import Main from '../main'
import PageTitle from '../includes/page_title.js';
import { Link } from 'react-router-dom'
const axios = require('axios');
class MediaCenter extends Main {
	constructor(props){
	    super(props);
	    this.check_login();
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	      	error : '',
	      	filter : [],
	      	media : [],
	    }
	}
	componentDidMount(){	
		this.filter_menu();
		this.get_media();
	}	
	get_media(){
		var self = this;
		axios.get(this.state.config.api_url+"media-centre", {
		    params: {
		      _format: "json"
		    }
	  	})
	  	.then(function (response) {
	  		self.setState({
	            media: response.data
	        });
	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	});
	}
	filter_menu(){
		var self = this;
		axios.get(this.state.config.api_url+"filter", {
		    params: {
		      _format: "json"
		    }
	  	})
	  	.then(function (response) {
	  		self.setState({
	            filter: response.data
	        });
	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	});
	}
  	render() {
  		
  		const { filter, media } = this.state;
	    return (
	      <div id="main-content">
	      	<PageTitle title="Media Center"/>
	      	<div id="breadcrumb-wrap">
				<div className="container">
					<Link to="/">Home</Link> \ <span>
					<Link to="/media-center">Media Center</Link></span>					
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col s3 left-side">
						<div className="filter-wrap">
							<h3>Filter Media</h3>
							<ul >
								{filter.map((row, index) => (
								<li className="media-item" key={index}>
									<Link to={"/filter-media/"+row.tid}>{row.filter}<span>{row.count}</span></Link>
								</li>
								))}
							</ul>
							<span className="grey-square-rotate"></span>
							<span className="multi-square"><b><i></i></b></span>
						</div>
					</div>
					<div className="col s9 media-content">
						<div className="flex-row col-3">							
							{media.map((row, index) => (
								<div className="media-item" key={index}>
									<div dangerouslySetInnerHTML={{__html: row.category}} className={"category-wrap "+row.category.toLowerCase()}></div>
									<h3><Link to={"/news/"+row.nid} >{row.title}</Link></h3>
									<div className="row">
										<div className="col s4" >
											{row.category === 'Video' &&
												<div className="videowrapper">
													<object data={row.video}>
											            <param name="movie" value={row.video}></param>
											            <param name="allowFullScreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" value="true"></param>
											        </object>
												</div>
											}
											{(row.category === 'Gallery'|| row.category === 'ARTICLE') &&
												<div dangerouslySetInnerHTML={{__html: row.media}} className="img-wrap"></div>
											}
										</div>
										<div className="col s8">
											<div className="desc" dangerouslySetInnerHTML={{__html: row.description}}></div>
											<div className="date-wrap" dangerouslySetInnerHTML={{__html: row.date}}></div>
										</div>
									</div>
								</div>
							))}
							
						</div>
					</div>
				</div>
			</div>
	      </div>
	    )
  	}
}
export default MediaCenter