import { Component } from 'react'
class Main extends Component {
	check_login = () => {
		// console.log('login check function');
	};
	config = () => {
		var  config = {
			"environment" : "production", //development | production
			"api_url" : "http://13.81.209.109/api/",
			"origin" : "http://13.81.209.109/",
			"social_media_links" : {
				"facebook" : "https://www.facebook.com/sharer/sharer.php?u=http://13.81.209.109/studio/src/sites/#/media&amp;src=sdkpreparse",
				"twitter" : "http://twitter.com/share?text=Media Center&amp;url=http://13.81.209.109/studio/src/sites/#/media",
			}
		};
		return config;
	};
}
export default Main