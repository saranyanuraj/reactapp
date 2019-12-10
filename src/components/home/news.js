import React from 'react'
import Main from '../main'
import { Link } from 'react-router-dom'
const axios = require('axios');
class News extends Main {
	constructor(props){
	    super(props);
	    this.state = {
	      	config : this.config(),	      	
	      	news : [],
	      	news_video : [],
	      	news_gallery : [],
	    }
	}
	componentDidMount(){	
		this.get_news();
		this.get_news_video();
		this.get_news_gallery();
	}
	get_news_gallery(){
		var self = this;
		axios.get(this.state.config.api_url+"featured-news-gallery", {
		    params: {
		      _format: "json"
		    }
	  	})
	  	.then(function (response) {
	  		self.setState({
	            news_gallery: response.data
	        });
	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	});
	}
	get_news_video(){
		var self = this;
		axios.get(this.state.config.api_url+"featured-news-video", {
		    params: {
		      _format: "json"
		    }
	  	})
	  	.then(function (response) {
	  		self.setState({
	            news_video: response.data
	        });
	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	});
	}
	get_news(){
		var self = this;
		axios.get(this.state.config.api_url+"featured-news-article", {
		    params: {
		      _format: "json"
		    }
	  	})
	  	.then(function (response) {
	  		self.setState({
	            news: response.data
	        });
	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	})
	  	.then(function () {
	    	// always executed
	  	});
	}
	render() {
  		const {  news, news_gallery, news_video	} = this.state;
	    return (
	    	<div className="news-wrap">
				<div className="container">
					<h2 className="line">
						<span className="orange-text">UPDATES</span>
						News &amp; Media
						<span className="grey-square-rotate"></span>
					</h2>
					<div className="flex-row col-2">
						<div className="item news-item">
							<div className="flex-row col-3">
								{news.map((row, index) => (
									<div className="" key={index}>
					            		<Link to={"/news/"+row.nid} className="item">
					            			<h3 dangerouslySetInnerHTML={{__html: row.title}}></h3>
					            		</Link>
					            		<Link to={"/news/"+row.nid}>
					            			<div className="img-wrap" dangerouslySetInnerHTML={{__html: row.image}}></div>
					            		</Link>
					            		<div dangerouslySetInnerHTML={{__html: row.category}} className="category-wrap"></div>
					            		<Link to={"/news/"+row.nid}>
					            			<div className="desc" dangerouslySetInnerHTML={{__html: row.description}}></div>
					            		</Link>
					            		<div className="date-wrap" dangerouslySetInnerHTML={{__html: row.date}} ></div>
					            	</div>
				          		))}
							</div>	
						</div>	
						<div className="item gal-item">
							<div className="flex-row col-2">
								<div className="item">
									{news_video.map((row, index) => (
									<div className="" key={index}>
										<Link to={"/news/"+row.nid}>
											<div className="videowrapper">
											<object
								            data={ row.video }>
								            <param name="movie" value={ row.video } />
								            <param name="allowFullScreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" value="true"></param>
								            </object>
											</div>
										</Link>
										<div className="category-wrap Video" dangerouslySetInnerHTML={{__html: row.category}} ></div>
										<Link to={"/news/"+row.nid}>
											<div className="desc" dangerouslySetInnerHTML={{__html: row.title}}></div>
										</Link>
										<div className="date-wrap" dangerouslySetInnerHTML={{__html: row.date}}></div>
									</div>
								))}
								</div>
								<div className="item">
									{news_gallery.map((row, index) => (
									<div className="" key={index}>
										<Link to={"/news/"+row.nid} >
											<div className="img-wrap" dangerouslySetInnerHTML={{__html: row.image}}></div>
										</Link>
										<div className="category-wrap Gallery" dangerouslySetInnerHTML={{__html: row.category}} ></div>
										<Link to={"/news/"+row.nid}>
											<div className="desc" dangerouslySetInnerHTML={{__html: row.title}}></div>
										</Link>
										<div className="date-wrap" dangerouslySetInnerHTML={{__html: row.date}}></div>
									</div>
								))}
								</div>
							</div>
						</div>
					</div>
					<div className="view-more home">
						<Link to="/media-center">View More
							<i className="material-icons">arrow_forward</i>
	 					</Link>
					</div>
					<div className="multi-square"><b><i></i></b></div>
					<div className="multi-circle"><b><i></i></b></div>
				</div>
			</div>
	    )
	}
}
export default News