import React from 'react';
import Session from '../Session';
import SignOut from './SignOut.jsx';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import { navigate } from '@reach/router';

const SIGN_OUT = gql`
mutation SignOut{
	logout
}
`;

export default class SignOutContainer extends React.Component {
	render() {
		return (
			<Session>
				<Mutation 
					mutation={SIGN_OUT}
					onCompleted={() => navigate('/signin')}
				>
					{ mutation => {
						mutation();
						return <SignOut/>
					}}
				</Mutation>
			</Session>
		);
	}
}
