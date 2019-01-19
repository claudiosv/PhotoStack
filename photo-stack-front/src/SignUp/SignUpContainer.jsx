import React from 'react';
import Session from '../Session';
import SignUp from './SignUp.jsx';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import { navigate } from '@reach/router';

const SIGN_UP = gql`
mutation ($email: String!, $password: String!, $firstName: String!, $lastName: String!){
	createUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
		  id
	  }
}
`;

export default class SignUpContainer extends React.Component {
	render() {
		return (
			<Session>
				<Mutation 
					mutation={SIGN_UP}
					onCompleted={() => navigate('/')}
				>
				{(performMutation, {error} )=> (<SignUp errorMessage={error} onSignUp={performMutation}/>)}
				</Mutation>
			</Session>
		);
	}
}
