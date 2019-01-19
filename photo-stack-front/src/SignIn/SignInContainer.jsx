import React from 'react';
import {navigate, Redirect} from '@reach/router';
import Session from '../Session';
import SignIn from './SignIn.jsx';
import {ApolloConsumer} from 'react-apollo';
import gql from 'graphql-tag';
import {Help} from 'bloomer';
import { createHistory } from '@reach/router/lib/history';

const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
    }
  }
`;

export default class SignInContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ''
		};
		this.handleError = this.handleError.bind(this);
	}

	handleError(error){
		if (error) {
			this.setState({
				error: error.message
			});
		}
	}

	render() {
		const {error} = this.state;
		return (
			<Session>
				<ApolloConsumer>
					{client => (
					<SignIn 
						onSignIn={
							async (email, password) => {
							client.query({
									query: LOGIN,
									variables: {email, password}
							}).then(data => {
									navigate('/');
							}).catch(error => this.handleError(error));
							}
						} error={error}/>)
						}
				</ApolloConsumer>
			</Session>
		);
	}
}
