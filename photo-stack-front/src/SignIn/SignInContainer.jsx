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
			email: false,
			psw: false
		};
		this.onSignIn = this.onSignIn.bind(this);
	}

	onSignIn(email, psw) {
		this.setState({
			email,
			psw
		});
	}

	render() {
		const {email, psw} = this.state;
		return (
			<Session>
				<ApolloConsumer>
					{client => (
						<SignIn onSignIn={
							async (email, password) => {
								const {error, data} = await client.query({
									query: LOGIN,
									variables: {email, password}
								});
								console.log(email);
							}
						}/>
					)}
				</ApolloConsumer>
			</Session>
		);
	}
}
