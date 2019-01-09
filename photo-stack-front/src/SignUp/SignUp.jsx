import React from 'react';
import PropTypes from 'prop-types';
import {Title, Box, Message, MessageBody} from 'bloomer';
import SignUpForm from './SignUpForm.jsx';
import '../stylesheets/signup.scss';

export default class SignUp extends React.PureComponent {
	render() {
		const {onSignUp, errorMessage} = this.props;
		return (
			<>
				<Title>Sign Up</Title>
				<Box hasTextAlign="left">
					{ errorMessage && (
						<Message isColor="danger">
							<MessageBody><p>{errorMessage}</p></MessageBody>
						</Message>
					)}
					<SignUpForm onSignUp={onSignUp}/>
				</Box>
				<p><a href="/signin">Sign-in</a></p>
			</>
		);
	}
}

SignUp.propTypes = {
	onSignUp: PropTypes.func.isRequired,
	errorMessage: PropTypes.string
};

SignUp.defaultProps = {
	errorMessage: ''
};
