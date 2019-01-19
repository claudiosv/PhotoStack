import React from 'react';
import {navigate, Redirect} from '@reach/router';
import Session from '../Session';
import SignIn from './SignIn.jsx';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Help} from 'bloomer';

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
			email: '',
			password: '',
			error: ''
		};
		this.handleError = this.handleError.bind(this);
	}

	handleError({error}){
		console.log('HOI');
		if (error) {
			this.setState({
				error: error.message
			});
		}
		navigate('/');
	}

	handleSignIn(email, password) {
		this.setState({
			email,
			password
		})
	}

	render() {
		const {error, email, password} = this.state;
		return (
			<Session>
				{error === '' ? null : <Help isColor="danger">{error}</Help>}
				<ApolloConsumer>
					{client => (
					<SignIn 
						onSignIn={
							async (email, password) => {
							client.query({
									query: LOGIN,
									variables: {email, password}
							}).then(data => {
									console.log('redir ', data);
									navigate('/');
							}).catch(error => this.handleError(error));
							}
						}/>)
						}
				</ApolloConsumer>
			</Session>
		);
	}
}
