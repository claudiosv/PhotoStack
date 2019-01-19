import React from 'react';
import {Redirect} from 'react-router-dom';
import Session from '../Session';
import SignUp from './SignUp.jsx';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const GET_AUTOCOMPLETE = gql`
mutation ($email: String!, $password: String!, $firstName: String!, $lastName: String!){
	createUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
		  id
	  }
}
`;

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
				<SignUp onSignUp={this.onSignUp}/>
				{confirmStatus ? <Redirect to="/"/> : null}
			</Session>
		);
	}
}
