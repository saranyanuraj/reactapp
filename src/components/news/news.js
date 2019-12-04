import React from 'react'
import Main from '../main'
import { Link } from 'react-router-dom'
import PageTitle from '../includes/page_title.js';
// import $ from 'jquery'
// import M from 'materialize-css'
const axios = require('axios');
class News extends Main {
	constructor(props){
	    super(props);
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	      	media : [],
	      	page_key : '',
	      	id : ''
	    }
	}
	componentDidMount(){
		this.get_media();
	}
	get_media(){
		var self = this;
		const {match : {params}} = this.props;
		axios.get(this.state.config.api_url+"media-details/"+params.id, {
		    params: {
		      _format: "json"
		    }
	  	})
	  	.then(function (response) {
	  		self.setState({
	            media: response.data,
	            page_key : response.data[0]['category']
	        });
	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	});
	}
  	render() {    
	  	let { media, page_key } = this.state;
	  	const top_line_img = require('../../assets/images/top-line.png');
	    return (
	       <div className={page_key.toLowerCase()}>
		      	<PageTitle title="News"/>
				<div id="main-container">
					{media.map((row, index) => (
						<div key={index} >
							<div className="container">
								<span className="multi-square"><b><i></i></b></span>
								<span className="grey-square-rotate"></span>
								<span className="grey-square-rotate bottom"></span>
								<span className="orange-circle"></span>
								<div id="breadcrumb-wrap">
									<Link to="/home">Home</Link> \ <Link to="/media-center">Media Center</Link> \ <span  dangerouslySetInnerHTML={{__html: row.title}} ></span>
								</div>
								<h1 >{row.title}</h1>
								<div className="date-wrap">{row.date} </div>
								{row.category === 'ARTICLE' &&
									<div className="article-news">
										<div dangerouslySetInnerHTML={{__html: row.media}} className="img-wrap"></div>
									</div>
								}
								<div dangerouslySetInnerHTML={{__html: row.description}} className="content"></div>
							</div>
							{row.category === 'Gallery' &&
								<div  className="gallery-news">
									<div className="container">
										<div dangerouslySetInnerHTML={{__html: row.media}} className="img-wrap"></div>
									</div>
								</div>
							}
							{row.category === 'Video' &&
								<div className="video-news">
									<div className="container">
										<div className="videowrapper">
											<object 
										     data={row.video}>
										    <param name="movie" value={row.video} />
										    <param name="allowFullScreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" value="true"></param>
										    </object>
										</div>

									</div>
								</div>
							}
							<div className="container">
								<div className="view-more"><Link to="/media-center"><i className="material-icons" >keyboard_backspace</i>  View More</Link></div>
							</div>
						</div>
					))}
				</div>

				<div className="top-line ng-scope"><img src={top_line_img} alt="" /></div>
	      </div>
	    )
  	}
}
export default News