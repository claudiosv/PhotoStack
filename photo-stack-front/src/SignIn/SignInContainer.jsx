import React from 'react';
import {navigate} from '@reach/router';
import Session from '../Session';
import SignIn from './SignIn.jsx';
import {ApolloConsumer} from 'react-apollo';
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

	render() {
		const {error} = this.state;
		return (
			<Session>
				{error === '' ? null : <Help isColor="danger">{error}</Help>}
				<ApolloConsumer>
					{client => (
					<SignIn 
						onSignIn={ async (email, password) => {
							console.log('dhjsfhjsd');
							const {error} = await client.query({
									query: LOGIN,
									variables: {email, password},
								});
							console.log('TIAKANe');
							this.handleError(error);
							}}
						/>)
						}
				</ApolloConsumer>
			</Session>
		);
	}
}
