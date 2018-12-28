import React from 'react';
import LoginView from './LoginView.jsx';

export default class LoginContainer extends React.Component {
	constructor(props) {
		super(props);
		this.onSignIn = this.onSignIn.bind(this);
	}

	onSignIn(email, psw) {
		alert(email + psw);
	}

	render() {
		return (
			<LoginView onSignIn={this.onSignIn}/>
		);
	}
}
