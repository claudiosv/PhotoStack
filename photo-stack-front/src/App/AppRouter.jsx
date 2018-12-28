import React from 'react';
import {Switch, Route} from 'react-router-dom';
import LoginContainer from '../Login';
import AppContainer from '.';

export default class AppRouter extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={AppContainer}/>
				<Route exact path="/login" component={LoginContainer}/>
			</Switch>
		);
	}
}
