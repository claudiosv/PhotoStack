import React from 'react';
import {Switch, Route} from 'react-router-dom';
import SignInContainer from '../SignIn';
import SignOutContainer from '../SignOut';
import SignUpContainer from '../SignUp';
import PreferencesContainer from '../Preferences';
import HeapCreateContainer from '../Heap/HeapCreateContainer.jsx';
import AppContainer from '.';

export default class AppRouter extends React.Component {
	render() {
		return (
			<>
				<Switch>
					<Route exact path="/" component={AppContainer}/>
					<Route path="/signin" component={SignInContainer}/>
					<Route path="/signup" component={SignUpContainer}/>
					<Route path="/signout" component={SignOutContainer}/>
				</Switch>
				<Route path="/preferences" component={PreferencesContainer}/>
				<Route path="/create" component={HeapCreateContainer}/>
			</>
		);
	}
}
