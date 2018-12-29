import React from 'react';
import PropTypes from 'prop-types';
import {Title, Field, Label, Control, Input, Checkbox, Box, Button} from 'bloomer';

export default class SignIn extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			psw: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({
			[name]: value
		});
	}

	render() {
		return (
			<>
				<Title>Sign in</Title>
				<Box hasTextAlign="left">
					<Field>
						<Label>Email</Label>
						<Control>
							<Input isSize="large" name="email" type="email" placeholder="Your email..." value={this.state.email} onChange={this.handleChange}/>
						</Control>
					</Field>
					<Field>
						<Label>Password</Label>
						<Control>
							<Input isSize="large" name="psw" type="password" placeholder="Your password..." value={this.state.psw} onChange={this.handleChange}/>
						</Control>
					</Field>
					<Field>
						<Control>
							<Checkbox isUnselectable> Remember me</Checkbox>
						</Control>
					</Field>
					<Field>
						<Button isFullWidth isSize="large" isColor="info" onClick={() => this.props.onSignIn(this.state.email, this.state.psw)}>Sign in</Button>
					</Field>
				</Box>
				<p><a href="/signup">Sign-up</a> · <a href="/forgot_psw">Forgot Password</a></p>
			</>
		);
	}
}

SignIn.propTypes = {
	onSignIn: PropTypes.func.isRequired
};
