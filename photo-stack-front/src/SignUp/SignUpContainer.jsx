import React from 'react';
import {Redirect} from 'react-router-dom';
import Session from '../Session';
import SignUp from './SignUp.jsx';

export default class SignUpContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmStatus: false
		};
		this.onSignUp = this.onSignUp.bind(this);
	}

	onSignUp(values) {
		// On success
		this.setState({
			confirmStatus: true
		});
		// Do login
	}

	render() {
		const {confirmStatus} = this.state;
		return (
			<Session>
				<>
					<SignUp onSignUp={this.onSignUp}/>
					{confirmStatus ? <Redirect to="/"/> : null}
				</>
			</Session>
		);
	}
}