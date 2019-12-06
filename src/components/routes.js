import React from 'react'
import { Route, BrowserRouter as Router, Switch, } from 'react-router-dom'
import Navigation from './includes/navigation'
import Footer from './includes/footer'
import Home from './home/home'
import MediaCenter from './media-center/media_center'
import FilterMedia from './media-center/filter_media'
import Subscribe from './subscribe/subscribe'
import ThankYou from './subscribe/thank_you'
import News from './news/news'
import Notfound from './notfound'
import '../assets/css/materialize.min.css'
import '../assets/css/style.css'
class Routes extends React.Component {
  
  render() {
    return (
      <Router  basename={'/react/'}>        
	      <Navigation />
	      <Switch>
	        <Route exact path="/" component={Home} />
          <Route exact path="/media-center" component={MediaCenter} />
          <Route exact path="/filter-media/:id" component={FilterMedia} />
          <Route exact path="/subscribe" component={Subscribe} />
          <Route exact path="/thankyou" component={ThankYou} />
          <Route exact path="/news/:id" component={News} />
	        <Route component={Notfound} />
	      </Switch>
        <Footer />
      </Router>
    )
  }
}
export default Routes