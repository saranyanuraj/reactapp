import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Main } from '../main'
export class PrivateRoute extends Main{
	constructor(props, { component: Component, ...rest }){
		super(props)
		this.state = {
			loaded : false,
			permission : false,
			redirect : false,
		}
		// this.accessPermission.bind(this);
	}
	async componentDidMount(){
		// const isAuthenticated = useAuth();
		// var {...rest } = this.props;
		console.log("ok");	
		// var res = await this.accessPermission();
		// this.setState(res);
		
	}
	render(){
		var {...rest } = this.props;
		var { permission, redirect } = this.state;

		if(!permission && !redirect){
			return "Holding";
		}
		else if(!permission && redirect){
			return (<Redirect to={redirect} />)
		}
		else if(permission){
			return (
				<Route {...rest} />
					/*<Route {...rest} render={props =>
			          <Component {...props} />
			      }
			    />*/
				)
		}else{}
	}
}

/*function PrivateRoute({ component: Component, ...rest }) { 
	const isAuthenticated = useAuth();
	console.log("Ok", isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}*/

export default PrivateRoute;