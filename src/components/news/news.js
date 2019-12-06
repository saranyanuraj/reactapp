import React from 'react'
import Main from '../main'
import { Link } from 'react-router-dom'
import PageTitle from '../includes/page_title.js'
import SlideToTop from '../includes/slide_to_top.js'
import Slider from "react-slick";
const axios = require('axios');
class News extends Main {
	constructor(props){
	    super(props);
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	      	media : [],
	      	slider : [],
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
		const { config } = this.state;
		axios.get(this.state.config.api_url+"media-details/"+params.id, {
		    params: {
		      _format: "json"
		    }
	  	})
	  	.then(function (response) {
	  		var category = response.data[0]['category'];
	  		self.setState({
	            media: response.data,
	            page_key : category
	        });
	        if(category === 'Gallery'){
	        	axios.get(config.api_url+"media-detail-gallery/"+params.id, {
				    params: {
				      _format: "json"
				    },
			  	})
			  	.then(function (response) {
			  		self.setState({
			            slider: response.data['media-gallery']
			        });
			  	})
			  	.catch(function (error) {
			    	console.log(error);
			  	});
	        }

	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	});
	}
  	render() {    
	  	let { media, page_key, slider} = this.state;
	  	const top_line_img = require('../../assets/images/top-line.png');
	  	const slider_settings = {
	  		className: "slider",
		    dots: true,
		    infinite: true,
		    speed: 500,
      		slidesToShow: 1,
		    slidesToScroll: 1,
	      	centerMode: true,
      		centerPadding: "60px",
		};
	    return (
	       <div className={page_key.toLowerCase()}>
	       		<SlideToTop />
		      	<PageTitle title="News"/>
				<div id="main-container" className="single-news">
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
									<Slider {...slider_settings}>
							          	{slider.map((slider, slide_index) => 
							          		<div key={slide_index} className="item">
							            		<img src={slider} alt="" />
							          		</div>
							          	)}

							        </Slider>
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