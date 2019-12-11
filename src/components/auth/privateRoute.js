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
		this.accessPermission.bind(this);
	}
	async componentDidMount(){
		var res = await this.accessPermission();
		this.setState(res);
		
	}
	render(){
		var {...rest } = this.props;
		var { permission, redirect } = this.state;

		if(!permission && !redirect){
			return null;
		}
		else if(!permission && redirect){
			return (<Redirect to={redirect} />)
		}
		else if(permission){
			return (
				<Route {...rest} />
				)
		}else{}
	}
}



export default PrivateRoute;