import React from 'react';
import {Redirect} from 'react-router-dom';
import Session from '../Session';
import SignIn from './SignIn.jsx';

export default class SignInContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInStatus: false
		};
		this.onSignIn = this.onSignIn.bind(this);
	}

	onSignIn(email, psw) {
		// On success
		this.setState({
			signInStatus: true
		});
	}

	render() {
		const {signInStatus} = this.state;
		return (
			<Session>
				<SignIn onSignIn={this.onSignIn}/>
				{signInStatus ? <Redirect to="/"/> : null}
			</Session>
		);
	}
}
