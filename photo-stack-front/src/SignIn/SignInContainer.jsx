import React from 'react';
import {Redirect} from '@reach/router';
import Session from '../Session';
import SignIn from './SignIn.jsx';
import {ApolloConsumer} from 'react-apollo';
import gql from 'graphql-tag';

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
			status: false
		};
		this.onSignIn = this.onSignIn.bind(this);
	}

	onSignIn() {
		this.setState({
			status: true
		});
	}

	render() {
		const {status} = this.state;
		return (
			<Session>
				<ApolloConsumer>
					{(client) => (
						<SignIn onSignIn={
							async (email, password) => {
								const {error, data} = await client.query({
									query: LOGIN,
									variables: {email, password}
								});
							}
						}/>
					)}
				</ApolloConsumer>
				{status && <Redirect to="/"/>}
			</Session>
		);
	}
}
