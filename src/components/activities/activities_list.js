import React from 'react'
import Main from '../main'
import SlideToTop from '../includes/slide_to_top.js'
import PageTitle from '../includes/page_title.js'
import { Link  } from 'react-router-dom'
import Pagination from "react-js-pagination";
import M from 'materialize-css'

const axios = require('axios');
var pager = {count : 0, pages : 0, items_per_page : 0, current_page : 1};
var search = { _format: "json", type : "All", title : "", field_start_end_dates_value : "", page:0 }
class ActivitiesList extends Main {
	constructor(props){
	    super(props);
	    this.check_login();
	    this.state = {
	    	isLoaded : false,
	      	config : this.config(),
	      	results : [],
	      	pager: pager,
	      	search: search,
	    }
		this.handleChange     = this.handleChange.bind(this);
		this.onSubmit         = this.onSubmit.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
	}
	componentDidMount(){	
		var options = {autoClose : true, format : 'd mmmm, yyyy'}
		document.addEventListener('DOMContentLoaded', function() {
		    var elems = document.querySelectorAll('.datepicker');
		    M.Datepicker.init(elems, options);
		});
		document.addEventListener('DOMContentLoaded', function() {
		   var elems = document.querySelectorAll('select');
		   M.FormSelect.init(elems, options);
		});
		this.get_activity();
	}
	get_activity(){
		var self = this;
		const {config, search} = this.state;
		axios.get(config.api_url+"activicties", {
		 params: search
	  	})
	  	.then(function (response) {
	  		self.setState({
	            results: response.data.results,
	            pager: response.data.pager,
	            isLoaded : true
	        });
	        
	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	});
	}
	handlePageChange(pageNumber) {
		var { search } = this.state;
		search.page = pageNumber-1;
		this.setState({search : search});
		this.get_activity();
	  }
	handleChange = (field , value) => {
		var { search } = this.state;
		search[field] = value;
		this.setState({search:search});
	}
	onSubmit = (event) => {
		event.preventDefault();
		this.get_activity();		
	}
  	render() {
  		const top_line_img = require('../../assets/images/top-line.png');
  		const { results, pager, isLoaded } = this.state;
	    return (
	    <div id="main-content" className="activiti-list">
	    	<SlideToTop />
	      	<PageTitle title="Subscribe with Activities"/>
	      	<div id="breadcrumb-wrap">
				<div className="container">           
					<Link to="/">Home</Link> \ <span>
					<Link to="/activities">Subscribe with Activities</Link></span>					
				</div>
			</div>
			<div id="main-container">
				<div className="container">
					<div className="search-wrap">
					<span className="multi-square one"><b><i></i></b></span>
					<form action="" onSubmit={this.onSubmit} method="post"  name="search" className="search">	
						<div className="row">	
							<div className="col s7">
								<div className="input-field item">
									<input name="Title"  
										placeholder="Title" 
										onChange={evt => this.handleChange('title', evt.target.value) }
										onFocus={evt => this.handleChange('title', evt.target.value) }
										id="title" 
										type="text" 
									/>
								    <label htmlFor="title">Title</label>						      
								</div>
							</div>
							<div className="col s3 date-popup">
								<div className="input-field item">
									<input name="Date"  
										placeholder="Date" 
										onChange={evt => this.handleChange('field_start_end_dates_value', evt.target.value) }
										onFocus={evt => this.handleChange('field_start_end_dates_value', evt.target.value) }
										id="field_start_end_dates_value" 
										type="text" 
										className="datepicker"
										readOnly="readonly"
										autoComplete="off"
									/>
								    <label htmlFor="field_start_end_dates_value">Date</label>						      
								</div>
							</div>
							<div className="col s2">
								<button className="btn yellow-btn search">Search <i className="material-icons">arrow_forward</i></button>
							</div>
						</div>
					</form>
					</div>
					<div className="row">
						<div className="col s7 result-status">
							{isLoaded ? "Search Result ( "+(pager.current_page+1)+" of "+pager.pages : ""} )

						</div>
						<div className="col s5 result-type">
							<div className="input-field col s12">
							    <select onChange={evt => this.handleChange('type', evt.target.value)}>
							      <option value="All" >All</option>
							      <option value="competitions">Competitions</option>
							      <option value="sessions">Sessions</option>
							      <option value="events">Events</option>
							    </select>
							    <label>Select Activity</label>
							</div>
						</div>
					</div>
					<div className="activities">
					{results.map((row, index) => (
						<div className="row" key={index}>						
							<div className="col s9">
								<h3 className="title"><Link to={"/activity/"+row.id} >{row.title}</Link > <span className={row.type.toLowerCase()}>{row.type}</span></h3>
								<div className="details">
									{row.startdate &&
										<span><i className="calendar-icons"></i> Start Date <span className="date">{row.startdate}</span></span>
									}
									{row.enddate &&
										<span><i className="calendar-icons"></i> End Date <span className="date">{row.enddate}</span></span>
									}
								</div>
							</div>
							<div className="col s3 btn-wrap">
								<Link to={"/activity/"+row.id} title="Details" className="btn blue-border">Details</Link>
								<Link to={"/activity/"+row.id} title="Details" className="btn blue-btn">Enroll</Link>

							</div>
						</div>
					))}
					{ !results.length && isLoaded &&
						<div className="row"><div className="col s12 no-result">No result found.</div></div>
					}
					</div>
					{ (results.length && isLoaded ) ?(
						<Pagination
						   prevPageText='Preview '
                           nextPageText='Next'
                           firstPageText='<'
                           lastPageText='>'
				          activePage={pager.current_page+1}
				          itemsCountPerPage={pager.items_per_page}
				          totalItemsCount={pager.count}
				          pageRangeDisplayed={5}
						  onChange={this.handlePageChange}
				        />):""
			    	}
				</div>
							<div className="sparkles">
				<span className="orange-circle"></span>
				<span className="multi-square two"><b><i></i></b></span>
				<span className="grey-square-rotate red-sq one"></span>
				<span className="grey-square-rotate red-sq two"></span>
			</div>				
			</div>
			<div className="top-line ng-scope">
				<img src={top_line_img} alt="" />
			</div>
	    </div>







	    )
  	}
}
export default ActivitiesList
