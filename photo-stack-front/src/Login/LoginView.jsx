import React from 'react';
import PropTypes from 'prop-types';
import {Hero, HeroBody, Column, Title, Field, Label, Control, Input, HeroHeader, Checkbox, Container, Heading, Box, Button} from 'bloomer';
import NavbarContainer from '../Navbar';

export default class LoginView extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			psw: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	render() {
		return (
			<Hero isFullHeight>
				<HeroHeader>
					<NavbarContainer/>
				</HeroHeader>
				<HeroBody>
					<Container hasTextAlign="centered" hasTextColor="dark">
						<Column isSize={4} isOffset={4}>
							<Heading>PhotoStack</Heading>
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
						</Column>
					</Container>
				</HeroBody>
			</Hero>
		);
	}
}

LoginView.propTypes = {
	onSignIn: PropTypes.func.isRequired
};
