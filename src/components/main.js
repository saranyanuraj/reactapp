import { Component } from 'react'
class Main extends Component {
	check_login = () => {
		// console.log('login check function');
	};
	config = () => {
		var fbUrl = "https://www.facebook.com/sharer/sharer.php?u="+window.location.href+"&amp;src=sdkpreparse";
        var twitterurl = "http://twitter.com/share?text="+document.title+"&amp;url="+window.location.href;
		var  config = {
			"environment" : "production", //development | production
			"api_url" : "http://13.81.209.109/api/",
			"origin" : "http://13.81.209.109/",
			"social_media_links" : {
				"facebook" : fbUrl,
				"twitter" : twitterurl,
			}
		};
		return config;
	};
}
export default Main