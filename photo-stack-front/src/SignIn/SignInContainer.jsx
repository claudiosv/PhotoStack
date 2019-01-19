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
				<SignIn onSignIn={this.handleSignIn}/>
				{email && 
					<Query query={LOGIN} variables={{email, password}}>
							{({loading, error, data}) => {
								if (loading) {
									return null
								}
								if (data) {
									return <Redirect to="/"/>
								}
								this.handleError(error);
								return null;
							}}
					</Query>
				}
			</Session>
		);
	}
}
