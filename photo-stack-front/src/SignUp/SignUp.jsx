import React from 'react';
import PropTypes from 'prop-types';
import {Title, Field, Label, Control, Input, Checkbox, Box, Button} from 'bloomer';

export default class SignUp extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			psw: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.validation = this.validation.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({
			[name]: value
		});
	}

	render() {
		const {email, psw} = this.state;
		const {onSignUp} = this.props;
		return (
			<>
				<Title>Sign in</Title>
				<Box hasTextAlign="left">
					<Field>
						<Label>Email</Label>
						<Control>
							<Input isSize="large" name="email" type="email" placeholder="Your email..." value={email} onChange={this.handleChange}/>
						</Control>
					</Field>
					<Field>
						<Label>Password</Label>
						<Control>
							<Input isSize="large" name="psw" type="password" placeholder="Your password..." value={psw} onChange={this.handleChange}/>
						</Control>
					</Field>
					<Field>
						<Control>
							<Checkbox isUnselectable> Remember me</Checkbox>
						</Control>
					</Field>
					<Field>
						<Button isFullWidth isSize="large" isColor="info" onClick={() => onSignUp(email, psw)}>Sign up</Button>
					</Field>
				</Box>
				<p><a href="/signin">Sign-in</a></p>
			</>
		);
	}
}

SignUp.propTypes = {
	onSignUp: PropTypes.func.isRequired
};
